import { useEffect, useState } from 'react';
import { supabase } from '../../../utils/supabase';

interface Participant {
    id: number;
    user_id: string | null;
    event_id: number | null;
    status: boolean;
    joined_at: string | null;
    members: {
        username: string | null;
        avatar: string | null;
    } | null;
}

export default function ParticipantsSection(props: { eventId: number, isHost: boolean }) {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 取得參加者資料
        async function fetchParticipants() {
            setLoading(true);
            const { data, error } = await supabase
                .from('event_participants')
                .select('id, user_id, event_id, status, joined_at, members(username, avatar)')
                .eq('event_id', props.eventId)
                .order('joined_at', { ascending: true });
            if (!error && data) {
                const formattedData = data.map((item: Participant) => ({
                    ...item,
                    members: {
                        username: item.members?.username ?? '',
                        avatar: item.members?.avatar ?? null,
                    }
                }));
                setParticipants(formattedData);
            }
            setLoading(false);
        }
        fetchParticipants();
    }, [props.eventId, props.isHost]);

    if (!props.isHost) return null;

    // 切換參加者資格
    async function handleStatusChange(participantId: number, newStatus: boolean) {
        const { error } = await supabase
            .from('event_participants')
            .update({ status: newStatus })
            .eq('id', participantId);
        if (!error) {
            setParticipants(prev =>
                prev.map(p =>
                    p.id === participantId ? { ...p, status: newStatus } : p
                )
            );
        }
    }

    return (
        <div className='grid gap-y-2 bg-white p-4 m-4 rounded-lg h-48'>
            <h1 className='text-xl font-bold'>參加者管理</h1>
            <p className='text-gray-500'>主辦者可在此決定哪些參加者成為正取。</p>
            {loading ? (
                <p className='text-gray-500'>載入參加者中...</p>
            ) : participants.length > 0 ? (
                <div className='grid gap-y-2 overflow-y-auto'>
                    {participants.map((p) => (
                        <div key={p.id} className='flex items-center gap-4 p-2 bg-gray-100 rounded-lg'>
                            <div className='avatar'>
                                <div className="w-10 rounded-full">
                                    <img src={p.members?.avatar ?? undefined} alt="avatar" />
                                </div>
                            </div>
                            <div className='flex-1'>
                                <p className='font-bold'>{p.members?.username ?? p.user_id}</p>
                                <p className='text-xs text-gray-500'>報名時間：{p.joined_at ? new Date(p.joined_at).toLocaleString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '無時間資料'}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-sm ${p.status ? 'text-green-600' : 'text-gray-500'}`}>
                                    {p.status ? '正取' : '備取'}
                                </span>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-success toggle-sm"
                                    checked={p.status}
                                    onChange={() => handleStatusChange(p.id, !p.status)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-gray-500'>目前沒有任何人報名</p>
            )}
        </div>
    );
}