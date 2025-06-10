import { EventInput } from '../../../../backend/event/Entities/EventInput.ts';
import InfoCreate from './infoCreate.tsx';

interface SecondStageProps {
    inputs: EventInput;
    setInputs: React.Dispatch<React.SetStateAction<EventInput>>;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
}

export default function SecondStage({ inputs, setInputs, handlePreviousStep, handleNextStep }: SecondStageProps) {
    // 檢查必填欄位是否已填寫
    const isRequiredFieldsFilled = () => {
        return (
            inputs.start_time &&
            inputs.end_time &&
            inputs.apply_due &&
            inputs.meeting_point &&
            inputs.destination
        );
    }

    const validateTimeLogic = () => {
        const endTimeCheck = new Date(inputs.end_time);
        const startTimeCheck = new Date(inputs.start_time);
        const applyDueCheck = new Date(inputs.apply_due);

        // 檢查時間邏輯（只比較到分鐘）
        const toMinute = (date: Date) => {
            const d = new Date(date);
            d.setSeconds(0, 0);
            return d;
        };

        const now = toMinute(new Date());
        const start = toMinute(startTimeCheck);
        const end = toMinute(endTimeCheck);
        const applyDue = toMinute(applyDueCheck);

        if (start < now) {
            alert('起始時間必須晚於現在時間');
            // 設定為當前時間（+8時區），格式為 yyyy-MM-ddTHH:mm
            const localNow = new Date();
            localNow.setHours(localNow.getHours() + 8);
            setInputs((prev) => ({ ...prev, start_time: localNow.toISOString().slice(0, 16) }));
            return false;
        }
        if (end < start) {
            alert('結束時間必須晚於起始時間');
            setInputs((prev) => ({ ...prev, end_time: '' }));
            return false;
        }
        if (applyDue >= start || applyDue < now) {
            // 檢查報名截止時間是否早於起始時間或晚於現在時間
            if (applyDue < now) {
                alert('報名截止時間必須晚於現在時間');
            }
            else {
                alert('報名截止時間必須早於揪人起始時間');
            }
            setInputs((prev) => ({ ...prev, apply_due: '' }));
            return false;
        }
        return true;
    };

    const handleNextStepWithValidation = () => {
        if (!validateTimeLogic()) return;
        handleNextStep();
    };

    return (
        <div>
            <h2 className="my-5 text-2xl text-center text-gray-700 font-bold dark:text-white" >揪人細項設定：基本資訊</h2 >
            <div className="rounded-lg mx-4 px-3 py-2 bg-neutral-content dark:bg-gray-100 overflow-x-auto">
                <h2 className="text-gray-700 font-bold my-2">想個吸引人的名稱吧！</h2>
                <input
                    className="w-full rounded p-2 bg-gray-50 border border-gray-300"
                    placeholder="若留空，將預設為揪人類型名稱"
                    type="text"
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
                setInputs={setInputs}
                inputs={inputs}
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
                    disabled={!isRequiredFieldsFilled()}
                    className={
                        `${!isRequiredFieldsFilled() ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#28527A]'} w-fit rounded-lg mx-4 px-3 py-2 mt-4 place-self-end flex justify-center text-white hover:scale-105`}
                    onClick={handleNextStepWithValidation}
                >
                    下一步
                </button>
            </div>
        </div>
    );
}