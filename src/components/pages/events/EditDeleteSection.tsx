import { useState } from 'react';
import Event from '../../../backend/event/Entities/Event';
import EventService from '../../../backend/event/Services/EventService';
import { supabase } from '../../../utils/supabase';

interface EditDeleteSectionProps {
    event: Event;
    isHost: boolean;
}

export default function EditDeleteSection({ event, isHost }: EditDeleteSectionProps) {
    const [editMeetingPoint, setEditMeetingPoint] = useState(event.meeting_point);
    const [editDestination, setEditDestination] = useState(event.destination);
    const [editStartTime, setEditStartTime] = useState(event.startTime ? EventService.toUTC8ISOString(event.startTime).slice(0, 16) : '');
    const [editEndTime, setEditEndTime] = useState(event.endTime ? EventService.toUTC8ISOString(event.endTime).slice(0, 16) : '');
    const [editApplyDue, setEditApplyDue] = useState(event.apply_due ? EventService.toUTC8ISOString(event.apply_due).slice(0, 16) : '');
    const [editFee, setEditFee] = useState(event.fee ?? 0);
    const [editDescription, setEditDescription] = useState(event.description);

    if (!isHost) return null;

    return (
        <div className="grid grid-cols-2 gap-2 w-full mt-4 px-4 flex-wrap">
            {/* Edit Button */}
            <button
                className="col-span-1 btn bg-yellow-500 hover:bg-yellow-600 text-white"
                onClick={() => {
                    const editModal = document.getElementById("editEvent_modal") as HTMLDialogElement | null;
                    editModal?.showModal();
                }}
            >
                編輯活動
            </button>
            <dialog id="editEvent_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg text-yellow-600 flex items-center justify-center mb-2">
                        編輯活動
                    </h3>
                    <form
                        className="flex flex-col gap-2"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            try {
                                const { error } = await supabase
                                    .from('events')
                                    .update({
                                        meeting_point: editMeetingPoint,
                                        destination: editDestination,
                                        start_time: new Date(editStartTime).toISOString(),
                                        end_time: new Date(editEndTime).toISOString(),
                                        apply_due: new Date(editApplyDue).toISOString(),
                                        fee: editFee,
                                        description: editDescription,
                                    })
                                    .eq('id', event.id);
                                if (error) throw error;
                                alert("活動已更新！");
                                window.location.reload();
                            } catch (err) {
                                alert("編輯活動時發生錯誤");
                                console.error(err);
                            }
                        }}
                    >
                        <label className="font-bold">集合地</label>
                        <input
                            name="meeting_point"
                            value={editMeetingPoint ?? ''}
                            onChange={e => setEditMeetingPoint(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                        <label className="font-bold">目的地</label>
                        <input
                            name="destination"
                            value={editDestination ?? ''}
                            onChange={e => setEditDestination(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                        <label className="font-bold">開始時間</label>
                        <input
                            type="datetime-local"
                            name="start_time"
                            value={editStartTime}
                            onChange={e => setEditStartTime(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                        <label className="font-bold">結束時間</label>
                        <input
                            type="datetime-local"
                            name="end_time"
                            value={editEndTime}
                            onChange={e => setEditEndTime(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                        <label className="font-bold">報名截止時間</label>
                        <input
                            type="datetime-local"
                            name="apply_due"
                            value={editApplyDue}
                            onChange={e => setEditApplyDue(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                        <label className="font-bold">費用（元）</label>
                        <input
                            type="number"
                            name="fee"
                            value={editFee}
                            min={0}
                            onChange={e => setEditFee(Number(e.target.value))}
                            className="input input-bordered w-full"
                        />
                        <label className="font-bold">活動說明</label>
                        <textarea
                            name="description"
                            value={editDescription ?? ''}
                            onChange={e => setEditDescription(e.target.value)}
                            className="textarea textarea-bordered w-full"
                            rows={4}
                        />
                        <div className="text-gray-400 text-sm mt-2">
                            <div>※ 圖片、活動類型、Hashtag暫不開放編輯，如需更動請聯絡管理員。</div>
                        </div>
                        <div className="modal-action flex justify-between">
                            <button type="submit" className="btn bg-yellow-500 hover:bg-yellow-600 text-white w-1/2">
                                儲存變更
                            </button>
                            <button
                                type="button"
                                className="btn w-1/2"
                                onClick={() => {
                                    const editModal = document.getElementById("editEvent_modal") as HTMLDialogElement | null;
                                    editModal?.close();
                                }}
                            >
                                取消
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* Delete Button */}
            <button
                className="col-span-1 btn bg-red-500 hover:bg-red-600 text-white"
                onClick={() => {
                    const deleteModal = document.getElementById("deleteEvent_modal") as HTMLDialogElement | null;
                    deleteModal?.showModal();
                }}
            >
                刪除活動
            </button>
            <dialog id="deleteEvent_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg text-red-600 flex items-center justify-center">
                        確認刪除活動
                    </h3>
                    <p className="py-4 text-center">
                        此操作無法復原，確定要刪除此活動嗎？<br />
                        請輸入活動名稱以確認刪除：
                    </p>
                    <input
                        id="deleteEvent_confirm_input"
                        type="text"
                        className="input input-bordered w-full mb-4"
                        placeholder="請輸入活動名稱"
                    />
                    <div className="modal-action flex justify-between">
                        <button
                            className="btn bg-red-500 hover:bg-red-600 text-white w-1/2"
                            onClick={async () => {
                                const input = document.getElementById("deleteEvent_confirm_input") as HTMLInputElement | null;
                                if (!input) return;
                                if (input.value !== event.name) {
                                    alert("輸入的活動名稱不正確，請再確認。");
                                    return;
                                }
                                try {
                                    const { error } = await supabase
                                        .from('events')
                                        .delete()
                                        .eq('id', event.id);
                                    if (error) throw error;
                                    window.location.href = "/events";
                                } catch (err) {
                                    alert("刪除活動時發生錯誤");
                                    console.error(err);
                                }
                            }}
                        >
                            確認刪除
                        </button>
                        <form method="dialog" className="w-1/2">
                            <button className="btn w-full">取消</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}