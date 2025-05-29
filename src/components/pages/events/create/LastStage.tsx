import { useState, FormEvent } from 'react';
import { EventInput } from "../../../../backend/event/Entities/EventInput"; // Adjust path as needed
import ImageUploader from "../../../Common/ImageUploader"; // Adjust path as needed
import { supabase } from '../../../../utils/supabase'; // Make sure supabase is configured and imported

interface StagedFile {
    file: File;
    previewUrl: string;
}

interface LastStageProps {
    inputs: EventInput;
    setInputs: React.Dispatch<React.SetStateAction<EventInput>>;
    currentUserId: string;
    handlePreviousStep: () => void;
    handleNextStep: (e?: FormEvent, newImageUrls?: string[]) => Promise<void> | void;
}

export default function LastStage({ inputs, setInputs, currentUserId, handlePreviousStep, handleNextStep }: LastStageProps) {
    const [stagedFiles, setStagedFiles] = useState<StagedFile[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleNewFilesSelected = (newFiles: File[]) => {
        if (newFiles.length === 0) return;

        const newStagedFilePromises = newFiles.map(file => {
            return new Promise<StagedFile | null>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve({ file, previewUrl: reader.result as string });
                };
                reader.onerror = () => {
                    console.error("Error reading file for preview:", file.name);
                    resolve(null);
                };
                reader.readAsDataURL(file);
            });
        });

        Promise.all(newStagedFilePromises).then(results => {
            const successfullyReadFiles = results.filter(result => result !== null) as StagedFile[];
            if (successfullyReadFiles.length > 0) {
                setStagedFiles(prevStagedFiles => [...prevStagedFiles, ...successfullyReadFiles]);
            }
        }).catch(error => {
            console.error("Error processing files for preview:", error);
        });
    };

    const removePreviouslyUploadedImage = (imageUrlToRemove: string) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            img: (prevInputs.img || []).filter(url => url !== imageUrlToRemove),
        }));
    };

    const removeStagedFile = (indexToRemove: number) => {
        setStagedFiles(prevStagedFiles => prevStagedFiles.filter((_, index) => index !== indexToRemove));
    };

    const handleUploadAndSubmit = async () => {
        if (!currentUserId) {
            alert("User information is not available. Cannot upload images.");
            return;
        }

        if (stagedFiles.length === 0) {
            // No new files to upload, just proceed to the next step
            handleNextStep();
            return;
        }

        setIsUploading(true);
        const uploadedImageUrls: string[] = [];
        const uploadErrors: { fileName: string, message: string }[] = [];

        for (const stagedFileObj of stagedFiles) {
            const file = stagedFileObj.file;
            const fileExt = file.name.split('.').pop();
            const filePath = `${currentUserId}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`; // Added randomness to filename

            try {
                const { error: uploadError } = await supabase.storage
                    .from("events") 
                    .upload(filePath, file, { upsert: false });

                if (uploadError) {
                    throw uploadError;
                }

                const { data: publicUrlData } = supabase.storage
                    .from("events")
                    .getPublicUrl(filePath);

                if (publicUrlData && publicUrlData.publicUrl) {
                    uploadedImageUrls.push(publicUrlData.publicUrl);
                } else {
                    throw new Error(`Could not retrieve public URL for ${file.name}.`);
                }
            } catch (err: unknown) {
                console.error(`Upload failed for ${file.name}:`, err);
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                uploadErrors.push({ fileName: file.name, message: errorMessage });
            }
        }

        setIsUploading(false);

        if (uploadErrors.length > 0) {
            const errorMessages = uploadErrors.map(e => `${e.fileName}: ${e.message}`).join("\n");
            alert(`Some images failed to upload:\n${errorMessages}\n\nSuccessfully uploaded images (if any) have been added.`);
        }

        if (uploadedImageUrls.length > 0) {
            setInputs(prevInputs => ({
                ...prevInputs,
                img: [...(prevInputs.img || []), ...uploadedImageUrls.filter(url => !(prevInputs.img || []).includes(url))],
            }));
        }

        setStagedFiles([]);
        handleNextStep(undefined, uploadedImageUrls);
    }

    return (
        <div>
            <h2 className="my-10 text-2xl text-center text-gray-700 font-bold dark:text-white">揪人細項設定：補充說明</h2>
            <div className="rounded-lg mx-4 px-3 py-2 bg-neutral-content dark:bg-gray-100 overflow-x-auto">
                <h3 className="text-gray-700 font-bold">其他詳情介紹</h3>
                <div className="text-xs text-gray-400">如果有前面的標籤無法描述的內容，請在這裡補充說明</div>
                <input
                    type="text"
                    className="w-full rounded p-2 bg-gray-50 border border-gray-300"
                    placeholder="其他補充..."
                    value={inputs.description || ''}
                    onChange={(e) => setInputs((prevInputs) => ({ ...prevInputs, description: e.target.value }))}
                />

                {/* Display previously uploaded images */}
                {inputs.img && inputs.img.length > 0 && (
                    <div className="my-4">
                        <h4 className="font-semibold text-gray-700">已上傳圖片:</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {inputs.img.map((imageUrl, index) => (
                                <div key={`uploaded-${index}-${imageUrl}`} className="relative group">
                                    <img
                                        src={imageUrl}
                                        alt={`已上傳圖片 ${index + 1}`}
                                        className="w-24 h-24 object-cover rounded border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removePreviouslyUploadedImage(imageUrl)}
                                        disabled={isUploading}
                                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="移除圖片"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <h2 className="text-gray-700 font-bold my-2">上傳照片 (可上傳多張)</h2>

                {/* Display staged files for upload (previews) */}
                {stagedFiles.length > 0 && (
                    <div className="my-4">
                        <h4 className="font-semibold text-gray-700">預覽待上傳圖片:</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {stagedFiles.map((stagedFileObj, index) => (
                                <div key={`staged-${index}-${stagedFileObj.file.name}`} className="relative group">
                                    <img
                                        src={stagedFileObj.previewUrl}
                                        alt={`待上傳預覽 ${index + 1}`}
                                        className="w-24 h-24 object-cover rounded border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeStagedFile(index)}
                                        disabled={isUploading}
                                        className="absolute top-0 right-0 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="移除此待上傳圖片"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                <ImageUploader
                    onFilesSelected={handleNewFilesSelected}
                    disabled={isUploading}
                />
            </div>

            <div className='flex flex-row justify-between mt-4'>
                <button type="button"
                    className="w-fit rounded-lg mx-4 px-3 py-2 place-self-start flex bg-[#28527A] text-white hover:scale-105 justify-center disabled:opacity-50"
                    onClick={handlePreviousStep}
                    disabled={isUploading}>
                    上一步
                </button>

                <button
                    type="button" // Changed from submit to button as we handle action via onClick
                    className="w-fit rounded-lg mx-4 px-3 py-2 place-self-end flex bg-[#28527A] text-white hover:scale-105 justify-center disabled:opacity-50"
                    onClick={handleUploadAndSubmit}
                    disabled={isUploading}
                >
                    {isUploading ? '處理中...' : '確認新增'}
                </button>
            </div>
        </div>
    );
}
