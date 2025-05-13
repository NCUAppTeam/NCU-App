import { EventInput } from "../../../../backend/event/Entities/EventInput";

interface LastStageProps {
    inputs: { description: string };
    setInputs: React.Dispatch<React.SetStateAction<EventInput>>;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
}

export default function LastStage({ inputs, setInputs, handlePreviousStep, handleNextStep }: LastStageProps) {
    // const [selectedPhotos, setSelectedPhotos] = useState<File | undefined>(undefined);
    return (
        <div>
            <h2 className="my-10 text-2xl text-center text-gray-700 font-bold dark:text-white" >揪人細項設定：補充說明</h2 >
            <div className="rounded-lg mx-4 px-3 py-2 bg-neutral-content dark:bg-gray-100 overflow-x-auto">
                <h3 className="text-gray-700 font-bold">其他詳情介紹</h3>
                <div className="text-xs text-gray-400">如果有前面的標籤無法描述的內容，請在這裡補充說明</div>
                <input
                    type="text"
                    className="w-full rounded p-2 bg-gray-50 border border-gray-300"
                    placeholder="其他補充..."
                    value={inputs.description}
                    onChange={(text) => setInputs((prevInputs) => ({ ...prevInputs, description: text.target.value }))}
                />
                <h2 className="text-gray-700 font-bold my-2">上傳照片</h2>
                {/* <ImageUploader selectedPhotos={selectedPhotos} setSelectedPhotos={setSelectedPhotos} /> */}

            </div>
            <div className='flex flex-row justify-between'>
                <button type="button"
                    className="w-fit rounded-lg mx-4 px-3 py-2 mt-4 place-self-start flex bg-[#28527A] text-white hover:scale-105 justify-center"
                    onClick={handlePreviousStep}>
                    上一步
                </button>

                <button
                    type="submit"
                    className="w-fit rounded-lg mx-4 px-3 py-2 mt-4 place-self-end flex bg-[#28527A] text-white hover:scale-105 justify-center"
                    onClick={handleNextStep}
                >
                    確認新增
                </button>
            </div>
        </div>
    );
}