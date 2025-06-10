import { Link } from '@tanstack/react-router';
import { Check } from 'flowbite-react-icons/outline';
import { useEffect } from 'react';
import { EventInput } from '../../../../backend/event/Entities/EventInput.ts';
import typeColor from '../constants/colorForEvents.ts';

interface FirstStageProps {
    setInputs: React.Dispatch<React.SetStateAction<EventInput>>;
    eventTypeInfo: { type_id: number; type_name: string } | null;
    eventTags: { type_id: number; type_name: string }[];
    selectedHashtags: number[];
    setSelectedHashtags: (hashtags: number[] | ((prev: number[]) => number[])) => void;
    loading: boolean;
    handleNextStep: () => void;
}

export default function FirstStage({
    setInputs,
    eventTypeInfo,
    eventTags,
    selectedHashtags,
    setSelectedHashtags,
    loading,
    handleNextStep,
}: FirstStageProps) {

    useEffect(() => {
        setInputs((prev: EventInput) => ({
            ...prev,
            hashtag: selectedHashtags, // Ensure hashtags are also set
        }));
        console.log('Selected hashtags updated:', selectedHashtags);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedHashtags]);

    return (
        <div className="max-w-lg mx-auto flex flex-col justify-center">
            <h2 className="my-10 text-2xl text-center text-gray-700 font-bold dark:text-white" >揪人細項設定：選擇標籤</h2 >
            <div className="px-4 py-2">
                <div className="rounded-lg p-3 mb-2 bg-gray-200 shadow dark:bg-gray-100">
                    <h3 className="text-gray-700 font-bold mb-2">選擇之揪人類型<span className="text-red-600">*</span></h3>
                    <div className="flex flex-wrap gap-2">
                        {eventTypeInfo && (
                            <span
                                className="rounded-full py-1 px-4 text-white"
                                style={{ backgroundColor: typeColor[eventTypeInfo.type_id - 1] }}
                            >
                                {eventTypeInfo.type_name}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Display hashtags selection */}
            <div className="px-4">
                <div className="rounded-lg p-3 mb-4 bg-gray-200 shadow dark:bg-gray-100">
                    <h3 className="text-gray-700 font-bold">選擇主題標籤 (可多選)</h3>
                    <div className="text-xs text-gray-400">讓大家更了解你的揪人篩選需求或吸引大家的目光</div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {loading ? (
                            <p className="text-gray-700">載入中...</p>
                        ) : eventTags.length > 0 ? (
                            eventTags.map((tag) => (
                                <div
                                    key={tag.type_id}
                                    className={`badge ${selectedHashtags.includes(tag.type_id) ? '' : 'badge-outline'
                                        } badge-lg cursor-pointer`}
                                    onClick={() => {
                                        setSelectedHashtags((prev) => {
                                            return prev.includes(tag.type_id)
                                                ? prev.filter((id: number) => id !== tag.type_id)
                                                : [...prev, tag.type_id];
                                        });
                                    }}
                                >
                                    {selectedHashtags.includes(tag.type_id) ? <Check className="size-4 mr-1" /> : null}
                                    {tag.type_name}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-700">沒有可用的標籤</p>
                        )}
                    </div>
                </div>
            </div>


            <div className='flex flex-row justify-between'>
                <Link to='/events/select'>
                    <button type="button"
                        className="w-fit rounded-lg mx-4 px-3 py-2 mt-4 place-self-start flex bg-[#28527A] text-white hover:scale-105 justify-center"
                    >
                        上一步
                    </button>
                </Link>

                <button
                    type="button"
                    className="w-fit rounded-lg mx-4 px-3 py-2 mt-4 place-self-end flex bg-[#28527A] text-white hover:scale-105 justify-center"
                    onClick={handleNextStep}
                >
                    下一步
                </button>
            </div>
        </div >
    );
}