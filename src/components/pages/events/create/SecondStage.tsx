import { EventInput } from '../../../../backend/event/Entities/EventInput.ts';
import InfoCreate from './infoCreate.tsx';

interface SecondStageProps {
    inputs: EventInput;
    setInputs: React.Dispatch<React.SetStateAction<EventInput>>;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
}

export default function SecondStage({ inputs, setInputs, handlePreviousStep, handleNextStep }: SecondStageProps) {
    return (
        <div>
            <h2 className="my-5 text-2xl text-center text-gray-700 font-bold dark:text-white" >揪人細項設定：基本資訊</h2 >
            <div className="rounded-lg mx-4 px-3 py-2 bg-neutral-content dark:bg-gray-100 overflow-x-auto">
                <h2 className="text-gray-700 font-bold my-2">想個吸引人的名稱吧！<span className="text-red-600">*</span></h2>
                <input
                    className="w-full rounded p-2 bg-gray-50 border border-gray-300"
                    placeholder="請輸入活動名稱"
                    value={inputs.name}
                    onChange={(text) => setInputs({ ...inputs, name: text.target.value })}
                />

                <div className="flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-start items-center">
                        <h2 className="w-full text-gray-700 font-bold my-2 h-full">揪人時段設定<span className="text-red-600">*</span></h2>
                        <div className="w-full flex flex-col mt-3 items-start gap-2">
                            <div className="w-full flex flex-row gap-2 justify-between mr-4">
                                <p className="w-full max-w-32 text-gray-700 font-bold text-center bg-white rounded-full p-2 text-xs">起始</p>
                                <input
                                    type="datetime-local"
                                    id="start-time"
                                    name="start-time"
                                    value={inputs.start_time}
                                    className="w-full rounded-lg bg-white text-black dark:bg-gray-500 dark:text-white px-1 h-8 self-center"
                                    onChange={(text) => setInputs({ ...inputs, start_time: text.target.value })}
                                />
                            </div>

                            <div className="w-full flex flex-row gap-2 justify-between mt-2 mr-4">
                                <p className="w-full max-w-32 grid self-center text-gray-700 font-bold text-center bg-white rounded-full p-2 text-xs">結束</p>
                                <input
                                    type="datetime-local"
                                    id="end-time"
                                    name="end-time"
                                    value={inputs.end_time}
                                    className="w-full rounded-lg bg-white text-black dark:bg-gray-500 dark:text-white px-1 h-8 self-center"
                                    onChange={(text) => setInputs({ ...inputs, end_time: text.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-start items-center mt-0 sm:mt-3">
                        <h2 className="flex w-full text-gray-700 font-bold my-2 h-full">報名截止時間設定<span className="text-red-600">*</span></h2>
                        <div className="w-full flex gap-3 justify-end">
                            <input
                                type="datetime-local"
                                id="apply-due"
                                name="apply-due"
                                value={inputs.apply_due}
                                className="w-full rounded-lg bg-white text-black dark:bg-gray-500 dark:text-white h-8 px-1"
                                onChange={(text) => setInputs({ ...inputs, apply_due: text.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <InfoCreate
                setInputs={(updatedFields) => setInputs({ ...inputs, ...updatedFields })}
                inputs={{ meeting_point: inputs.meeting_point, destination: inputs.destination, fee: inputs.fee }}
                type_id={inputs.type as 1 | 2 | 3 | 4 | 5}
            />
            <div className='flex flex-row justify-between'>
                <button type="button"
                    className="w-fit rounded-lg mx-4 px-3 py-2 mt-4 place-self-start flex bg-[#28527A] text-white hover:scale-105 justify-center"
                    onClick={handlePreviousStep}>
                    上一步
                </button>

                <button
                    type="button"
                    className="w-fit rounded-lg mx-4 px-3 py-2 mt-4 place-self-end flex bg-[#28527A] text-white hover:scale-105 justify-center"
                    onClick={handleNextStep}
                >
                    下一步
                </button>
            </div>
        </div>
    );
}