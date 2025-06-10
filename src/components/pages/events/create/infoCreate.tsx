import React, { SetStateAction, useEffect, useState } from 'react';
import { EventInput } from '../../../../backend/event/Entities/EventInput.ts';
import locationForEvents from '../constants/locationForEvents';

export default function InfoCreate({
    setInputs,
    inputs,
    type_id,
}: {
    setInputs: React.Dispatch<SetStateAction<EventInput>>;
    inputs: { meeting_point: string; destination: string; fee: number | null };
    type_id: 1 | 2 | 3 | 4 | 5;
}) {
    const [customLocation1, setCustomLocation1] = useState(false);
    const [customLocation2, setCustomLocation2] = useState(false);
    const [sameLoc, setSameLoc] = useState(true);

    // 當 type_id 變動時，重設 meeting_point 和 destination
    useEffect(() => {
        const defaultLoc = locationForEvents[type_id][0] || '';
        console.log(`Type ID changed to ${type_id}, resetting locations to default: ${defaultLoc}`);


        setCustomLocation1(false);
        setCustomLocation2(false);
        setInputs((prev) => ({
            ...prev,
            meeting_point: defaultLoc,
            destination: defaultLoc,
        }));

        setSameLoc(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type_id]);

    const handleMeetPointChange = (value: string) => {
        if (value === '其他') {
            setCustomLocation1(true);
            setInputs((prev) => ({ ...prev, meeting_point: '' }));
        } else {
            setCustomLocation1(false);
            setInputs((prev) => ({ ...prev, meeting_point: value }));
        }

    };

    const handleDestinationChange = (value: string) => {
        if (value === '其他') {
            setCustomLocation2(true);
            setInputs((prev) => ({ ...prev, destination: '' }));
        } else {
            setCustomLocation2(false);
            setInputs((prev) => ({ ...prev, destination: value }));
        }
    };

    return (
        <div className="rounded-lg mx-4 px-3 pb-2 bg-neutral-content dark:bg-gray-100 mt-3 overflow-x-auto">
            <div className="flex flex-col justify-items-end gap-1">
                {/* Meeting Point Field */}
                <div className="flex flex-col">
                    <p className="text-gray-700 font-bold my-2">集合地<span className="text-red-600">*</span></p>
                    <div className={`w-full ${customLocation1 ? 'flex flex-row gap-2' : ''}`}>
                        <select
                            className="w-full min-w-16 rounded p-2 bg-gray-50 border border-gray-300"
                            value={customLocation1 ? '其他' : inputs.meeting_point}
                            onChange={(e) => handleMeetPointChange(e.target.value)}
                        >
                            <option value="" disabled>
                                請選擇集合地點
                            </option>
                            {locationForEvents[type_id]?.map((location: string) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                            <option value="其他">其他</option>
                        </select>
                        {customLocation1 && (
                            <input
                                className="w-full rounded p-2 bg-gray-50 border border-gray-300"
                                placeholder="請輸入自訂地點"
                                value={inputs.meeting_point}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setInputs((prev) => ({
                                        ...prev,
                                        meeting_point: value,
                                        ...(sameLoc ? { destination: value } : {}),
                                    }));
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* Destination Field */}
                <div className='flex flex-col'>
                    <div className='flex flex-row items-center'>
                        <p className="text-gray-700 font-bold my-2">目的地 / 前往地點<span className="text-red-600">*</span></p>
                        <div className="ml-2">
                            <input
                                type="checkbox"
                                id="sameAsMeetingPoint"
                                className="mr-2"
                                checked={sameLoc}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setSameLoc(checked);
                                    if (checked) {
                                        setCustomLocation2(true);
                                        setInputs((prev) => ({
                                            ...prev,
                                            destination: prev.meeting_point,
                                        }));
                                    } else {
                                        setCustomLocation2(false);
                                        setInputs((prev) => ({
                                            ...prev,
                                            destination: '',
                                        }));
                                    }
                                }}
                            />
                            <label htmlFor="sameAsMeetingPoint" className="text-gray-700">
                                同上
                            </label>
                        </div>
                    </div>
                    <div className={`w-full ${customLocation2 ? 'flex flex-row gap-2' : ''}`}>
                        {sameLoc ? (
                            <input
                                className="read-only:bg-gray-200 w-full rounded p-2 bg-gray-50 border border-gray-300"
                                placeholder="請先設定集合地，預設為同上"
                                value={inputs.meeting_point}
                                readOnly
                            />
                        ) : (
                            <>
                                <select
                                    className="w-full min-w-16 rounded p-2 bg-gray-50 border border-gray-300"
                                    value={customLocation2 ? '其他' : inputs.destination}
                                    onChange={(e) => handleDestinationChange(e.target.value)}
                                >
                                    <option value="" disabled>
                                        請選擇前往地點
                                    </option>
                                    {locationForEvents[type_id]?.map((location: string) => (
                                        <option key={location} value={location}>
                                            {location}
                                        </option>
                                    ))}
                                    <option value="其他">其他</option>
                                </select>
                                {customLocation2 && (
                                    <input
                                        className="w-full rounded p-2 bg-gray-50 border border-gray-300"
                                        placeholder="請輸入自訂地點"
                                        value={inputs.destination}
                                        onChange={(e) => setInputs((prev) => ({ ...prev, destination: e.target.value }))}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Fee Field */}
                <div className='flex flex-col'>
                    <p className="text-gray-700 font-bold my-2">預估費用(TWD)</p>
                    <input
                        type="number"
                        className="w-full rounded p-2 bg-gray-50 border border-gray-300"
                        placeholder={inputs.fee === null ? "請輸入參加費用(請輸入數字，無則留空)" : ""}
                        value={inputs.fee === null ? '' : inputs.fee}
                        onChange={(e) => {
                            setInputs((prev) => ({
                                ...prev,
                                fee: e.target.value === '' ? null : Number(e.target.value),
                            }));
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
