import React, { SetStateAction, useState } from 'react';
import locationForEvents from '../constants/locationForEvents';

export default function InfoCreate({
    setInputs,
    inputs,
    type_id,
}: {
    setInputs: React.Dispatch<SetStateAction<{ meeting_point: string; destination: string; fee: number | null }>>;
    inputs: { meeting_point: string; destination: string; fee: number | null };
    type_id: 1 | 2 | 3 | 4 | 5; // type_id is one of these values
}) {
    const [customLocation1, setCustomLocation1] = useState(false); // Track if "其他" is selected
    const [customLocation2, setCustomLocation2] = useState(false);

    const handleMeetPointChange = (value: string) => {
        if (value === '其他') {
            setCustomLocation1(true); // Enable custom input
            setInputs({ ...inputs, meeting_point: '' }); // Clear location
        } else {
            setCustomLocation1(false); // Disable custom input
            setInputs({ ...inputs, meeting_point: value }); // Set location from dropdown
        }
    };

    const handleDestinationChange = (value: string) => {
        if (value === '其他') {
            setCustomLocation2(true); // Enable custom input
            setInputs({ ...inputs, destination: '' }); // Clear location
        } else {
            setCustomLocation2(false); // Disable custom input
            setInputs({ ...inputs, destination: value }); // Set location from dropdown
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
                            value={customLocation1 ? '其他' : inputs.meeting_point} // Show "其他" if custom input is enabled
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
                        </select>
                        {customLocation1 && (
                            <input
                                className="w-full rounded p-2 bg-gray-50 border border-gray-300"
                                placeholder="請輸入自訂地點"
                                value={inputs.meeting_point}
                                onChange={(e) => setInputs({ ...inputs, meeting_point: e.target.value })}
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
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setCustomLocation2(false); // Disable custom input
                                        setInputs({ ...inputs, destination: inputs.meeting_point }); // Set destination same as meeting_point
                                    } else {
                                        setInputs({ ...inputs, destination: '' }); // Clear destination
                                    }
                                }}
                                checked={inputs.destination === inputs.meeting_point} // Automatically check if destination matches meeting_point
                            />
                            <label htmlFor="sameAsMeetingPoint" className="text-gray-700">
                                同上
                            </label>
                        </div>
                    </div>


                    <div className={`w-full ${customLocation2 ? 'flex flex-row gap-2' : ''}`}>
                        {inputs.destination === inputs.meeting_point ? (
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
                                    value={customLocation2 ? '其他' : inputs.destination} // Show "其他" if custom input is enabled
                                    onChange={(e) => handleDestinationChange(e.target.value)}
                                    disabled={inputs.destination === inputs.meeting_point} // Disable dropdown if "同上" is checked
                                >
                                    <option value="" disabled>
                                        請選擇前往地點
                                    </option>
                                    {locationForEvents[type_id]?.map((location: string) => (
                                        <option key={location} value={location}>
                                            {location}
                                        </option>
                                    ))}
                                </select>
                                {customLocation2 && inputs.destination !== inputs.meeting_point && (
                                    <input
                                        className="w-full rounded p-2 bg-gray-50 border border-gray-300"
                                        placeholder="請輸入自訂地點"
                                        value={inputs.destination}
                                        onChange={(e) => setInputs({ ...inputs, destination: e.target.value })}
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
                        value={inputs.fee === null ? '' : inputs.fee} // Show empty string if fee is null
                        onChange={(e) => {
                            setInputs({ ...inputs, fee: e.target.value === '' ? null : Number(e.target.value) }); // Convert to number or set to null
                        }}
                    />
                </div>
            </div>
        </div>
    );
}