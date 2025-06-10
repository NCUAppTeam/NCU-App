import { AngleDown } from 'flowbite-react-icons/outline';
import { useEffect, useState } from 'react';
import { DBComment } from '../../../backend/event/Entities/Comment';
import { UserController } from '../../../controllers/user';
import { supabase } from '../../../utils/supabase';

export default function CommenSection(props: { eventId: number }) {
    const [CommentList, setCommentList] = useState<Array<DBComment>>([]);
    const [commentInput, setCommentInput] = useState<string>('');
    const [collapsed, setCollapsed] = useState(true);

    async function fetchComments(): Promise<Array<DBComment>> {
        const { data: comments, error: fetchError } = await supabase
            .from('comments')
            .select('*, members(username, avatar)')
            .eq('event_id', props.eventId)
            .order('commented_at', { ascending: true });

        if (fetchError) {
            console.error('Error fetching comments:', fetchError);
            return [];
        }
        return (comments || []).map((comment) => ({
            ...comment,
            members: {
                username: comment.members?.username ?? '',
                avatar: comment.members?.avatar ?? null,
            },
        }));
    }

    async function addComment(content: string) {
        const insertData = {
            content,
            event_id: props.eventId,
            user_id: (await UserController.get()).id,
            commented_at: new Date().toISOString(),
        };
        const { data, error } = await supabase
            .from('comments')
            .insert(insertData)
            .single();

        if (error) {
            console.error('Error adding comment:', error);
            return null;
        }
        return data;
    }

    useEffect(() => {
        async function loadComments() {
            const comments = await fetchComments();
            setCommentList(comments);
        }
        loadComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentInput.trim()) {
            alert('您未輸入任何留言');
            return;
        }
        await addComment(commentInput);
        setCommentInput('');
        const comments = await fetchComments();
        setCommentList(comments);
    };

    return (
        <div className='grid gap-y-2 bg-white p-4 m-4 rounded-lg h-108 relative'>
            <div className="flex justify-between items-center mb-2">
                <h1 className='text-xl font-bold'>公開留言區</h1>
                <button
                    className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded transition"
                    onClick={() => setCollapsed(c => !c)}
                    aria-label={collapsed ? "展開留言區" : "收合留言區"}
                >
                    {collapsed ? (
                        <AngleDown className="w-5 h-5 transform transition-transform" />
                    ) : (
                        <AngleDown className="w-5 h-5 transform rotate-180 transition-transform" />
                    )}
                </button>
            </div>
            {!collapsed && (
                <>
                    {CommentList.length > 0 ? (
                        <div className='grid gap-y-2 overflow-y-auto max-h-48 h-fit'>
                            {CommentList.map((comment, index) => (
                                <div key={comment.id ?? index} className='p-2 bg-gray-100 rounded-lg h-fit'>
                                    <div className='flex flex-row items-center gap-2 mb-2'>
                                        <div className='avatar'>
                                            <div className="w-10 rounded-full">
                                                <img src={comment?.members.avatar ?? undefined}></img>
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='font-bold'>{comment.members?.username}</p>
                                            <p>{comment.content}</p>
                                        </div>
                                    </div>
                                    {index + 1 === 1 ? (
                                        <p className="bg-gradient-to-r from-[#FF5F6D] via-[#FFC371] to-[#FBB03B] text-transparent bg-clip-text text-sm font-extrabold justify-self-end">首評</p>
                                    ) : (
                                        <p className="text-gray-500 text-sm justify-self-end">{index + 1} 樓</p>
                                    )}
                                    <p className='text-gray-500 text-sm justify-self-end'>
                                        留言於 {comment.commented_at ? new Date(comment.commented_at).toLocaleString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '無時間資料'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-gray-500'>暫無留言</p>
                    )}
                    <form
                        className='flex flex-col mt-4'
                        onSubmit={handleCommentSubmit}
                    >
                        <textarea
                            className='p-2 border rounded-lg'
                            placeholder='在此輸入留言...'
                            rows={3}
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                        ></textarea>
                        <button
                            type='submit'
                            className='mt-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600'
                        >
                            發表留言
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}