import { useEffect, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { DBChat } from '../../../backend/event/Entities/Chatroom';
import { UserController } from '../../../controllers/user';
import { supabase } from '../../../utils/supabase';

export default function Announcement(props: { eventId: number, ownerId: string, isHost: boolean }) {
    const [isQualified, setIsQualified] = useState<boolean | null>(null);
    const [announcements, setAnnouncements] = useState<Array<DBChat>>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        async function checkStatus() {
            const user = await UserController.get();
            if (props.ownerId === user.id) {
                // 如果是主辦者，直接設置為合格
                setIsQualified(true);
                return;
            }
            // 查詢 event_participants 表格以確認是否為正取者
            const { data, error } = await supabase
                .from('event_participants')
                .select('status')
                .eq('user_id', user.id)
                .eq('event_id', props.eventId)
                .single();
            if (error || !data) {
                setIsQualified(false);
                return;
            }
            setIsQualified(data.status === true);
        }
        checkStatus();
    }, [props.eventId, props.ownerId]);

    // 查詢 chatrooms 通知
    useEffect(() => {
        if (!isQualified) return;
        async function fetchAnnouncements() {
            const { data, error } = await supabase
                .from('chatrooms')
                .select('*, members(username, avatar, uuid)')
                .eq('event_id', props.eventId)
                .order('chat_created', { ascending: true });
            if (!error && data) {
                const formattedData = data.map((item) => ({
                    ...item,
                    members: {
                        username: item.members?.username ?? '',
                        avatar: item.members?.avatar ?? null,
                        uuid: item.members?.uuid ?? '',
                    },
                }));
                setAnnouncements(formattedData);

            }
        }
        fetchAnnouncements();
    }, [isQualified, props.eventId]);

    // 發布通知
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const user = await UserController.get();
        const { error } = await supabase
            .from('chatrooms')
            .insert({
                event_id: props.eventId,
                user_id: user.id,
                chat: input,
                chat_created: new Date().toISOString(),
            });
        if (!error) {
            setInput('');
            // 重新查詢
            const { data, error: fetchError } = await supabase
                .from('chatrooms')
                .select('*, members(username, avatar, uuid)')
                .eq('event_id', props.eventId)
                .order('chat_created', { ascending: true });

            if (!fetchError && data) {
                const formattedData = data.map((item) => ({
                    ...item,
                    members: {
                        username: item.members?.username ?? '',
                        avatar: item.members?.avatar ?? null,
                        uuid: item.members?.uuid ?? '',
                    },
                }));
                setAnnouncements(formattedData);
            }
        }
    }

    if (isQualified === null) {
        return <div>載入中...</div>;
    }

    if (!isQualified) {
        // 如果不是正取者或不是主辦者，顯示鎖頭圖示和提示
        return (
            <div className="flex flex-col items-center justify-center h-60">
                <FaLock className="w-16 h-16 text-gray-400 mx-auto my-4" />
                <p className="text-gray-500 text-lg text-center">你目前為備取者，暫不開放通知區</p>
            </div>
        );
    }

    return (
        <div className='grid gap-y-2 bg-white p-4 m-4 rounded-lg h-108'>
            <h1 className='text-xl font-bold'>通知區</h1>
            <p className='text-gray-500'>
                {props.isHost ? (
                    <span className='bg-gradient-to-r from-[#FF5F6D] via-[#FFC371] to-[#FBB03B] text-transparent bg-clip-text font-extrabold'>
                        你可以讓正取的參加者看到你所發布的通知。
                    </span>
                ) : (
                    <span className='bg-gradient-to-r from-[#FF5F6D] via-[#FFC371] to-[#FBB03B] text-transparent bg-clip-text font-extrabold'>
                        你已錄取為正取。在此區域，舉辦者可以發布重要通知或更新，你也可以回覆舉辦者。
                    </span>
                )}
            </p>
            {announcements.length > 0 ? (
                <div className='grid gap-y-2 overflow-y-auto max-h-48 h-fit'>
                    {announcements.map((chat, index) => (
                        <div key={chat.id ?? index} className='p-2 bg-gray-100 rounded-lg h-fit'>
                            <div className='flex flex-row items-center gap-2 mb-2'>
                                <div className='avatar'>
                                    <div className="w-10 rounded-full">
                                        <img src={chat?.members.avatar ?? undefined} alt="avatar" />
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className='flex items-center gap-2'>
                                        <p className='font-bold'>{chat.members?.username}</p>
                                        {chat.members?.uuid === props.ownerId && (
                                            <span className="text-xs bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded font-bold">主辦者</span>
                                        )}
                                    </div>
                                    <p>{chat.chat}</p>
                                </div>
                            </div>
                            {index + 1 === 1 ? (
                                <p className="bg-gradient-to-r from-[#FF5F6D] via-[#FFC371] to-[#FBB03B] text-transparent bg-clip-text text-sm font-extrabold justify-self-end">首評</p>
                            ) : (
                                <p className="text-gray-500 text-sm justify-self-end">{index + 1} 樓</p>
                            )}
                            <p className='text-gray-500 text-sm justify-self-end'>
                                留言於 {chat.chat_created ? new Date(chat.chat_created).toLocaleString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '無時間資料'}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-gray-500'>暫無通知</p>
            )}
            <form className='flex flex-col mt-4' onSubmit={handleSubmit}>
                <textarea
                    className='p-2 border rounded-lg'
                    placeholder='在此輸入通知...'
                    rows={3}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                ></textarea>
                <button
                    type='submit'
                    className='mt-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600'
                >
                    發布通知
                </button>
            </form>
        </div>
    );
}