import React, { useEffect, useState } from 'react';
import Order from '../../../backend/order/Entities/Order';
import OrderService from '../../../backend/order/Services/OrderService';

// 拼單者學號
interface UserListProps {
    userIds: string[];
}

const UserList: React.FC<UserListProps> = ({ userIds }) => {
    const [studentIds, setStudentIds] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStudentIds() {
            const result: { [key: string]: string } = {};

            for (const userId of userIds) {
                const studentId = await OrderService.getUserStudentId(userId);
                result[userId] = studentId;
            }

            setStudentIds(result);
            setLoading(false);
        }

        fetchStudentIds();
    }, [userIds]);

    if (loading) {
        return <li className="py-1">載入中...</li>;
    }

    return (
        <>
            {userIds.map((userId, idx) => (
                <li key={userId + idx} className="py-1 border-b">
                    {studentIds[userId] || userId}
                </li>
            ))}
        </>
    );
};

interface OrderCardProps {
    order: Order
    userId: string | null
    onJoinClick?: (order: Order) => void
    showJoinButton?: boolean
    className?: string
}

/**
 * 拼單卡片組件，用於顯示拼單詳細資訊
 * 
 * @param order - 拼單資料
 * @param userId - 當前用戶ID
 * @param onJoinClick - 點擊加入拼單的回調函數
 * @param showJoinButton - 是否顯示加入拼單按鈕
 * @param className - 額外的CSS類名
 */
export const OrderCard: React.FC<OrderCardProps> = ({
    order,
    userId,
    onJoinClick,
    showJoinButton = true,
    className = ''
}) => {
    // 格式化時間剩餘
    const formatTimeRemaining = OrderService.formatTimeRemaining;

    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
            <div className="flex bg-[#8ed3e6] justify-center">
                <h3 className="bg-red w-2/3 text-white text-sm md:text-xl font-medium p-2 text-center self-center">
                    挖愛呷
                </h3>
                <h3 className="w-full overflow-hidden bg-white text-black text-sm md:text-xl font-semibold p-2 border-b">
                    {order.restaurant || '餐廳未指定'}
                </h3>
            </div>

            <div className="p-4 bg-white">
                {/* 拼單剩餘時間 */}
                <div className="flex items-center justify-end">
                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {formatTimeRemaining(order.due)}
                    </span>
                </div>

                <div className='h-28'>
                    <p className="text-sm text-[#28527A] mt-3 italic font-bold">
                        取餐地點和時間: <span className='text-gray-500 font-normal'>{order.pickup || '未指定'}</span>
                    </p>

                    <p className='text-sm text-[#28527A] mt-3 italic font-bold'>
                        付款方式: <span className='text-gray-500 font-normal'>{order.payment ? '現場付' : '先付款'}</span>
                    </p>

                    <p className='h-10 text-sm text-[#28527A] mt-1 italic font-bold overflow-y-scroll'>
                        (可滑動)備註: <span className='text-gray-500 font-normal'>{order.ps || '無'}</span>
                    </p>
                </div>

                <div className='flex justify-between'>
                    <div>
                        {showJoinButton && userId && userId !== order.main && !order.add?.includes(userId) && (
                            <button
                                className="text-sm w-full bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 transition-colors"
                                onClick={() => onJoinClick && onJoinClick(order)}
                            >
                                加入拼單
                            </button>
                        )}

                        {userId && order.add?.includes(userId) && (
                            <div className="text-sm w-full bg-green-50 text-green-800 p-1 text-center rounded-md">
                                您已加入此拼單
                            </div>
                        )}
                        {userId && userId === order.main && (
                            <div className="text-sm w-full mt-4 bg-blue-100 text-blue-800 p-1 text-center rounded-md">
                                您發起的拼單
                            </div>
                        )}
                    </div>


                    {/* right button */}
                    <div>
                        {userId === order.main && (
                            <>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="text-sm text-[#28527A] italic font-bold underline"
                                        onClick={() => setShowAddModal(true)}
                                    >
                                        查看名單
                                    </button>
                                </div>
                                {showAddModal && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                                        <div className="bg-white rounded-lg shadow-lg p-6 w-80 relative">
                                            <h4 className="text-lg font-bold mb-2">已加入名單</h4>
                                            <button
                                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                                onClick={() => setShowAddModal(false)}
                                            >
                                                ×
                                            </button>
                                            <ul className="mt-2 text-xs text-gray-700 max-h-40 overflow-y-auto">
                                                {order.add && order.add.length > 0 ? (
                                                    <UserList userIds={order.add} />
                                                ) : (
                                                    <li className="py-1">目前無人加入</li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        <p className="flex text-sm text-[#28527A] italic justify-end font-bold">
                            已有 {order.add ? order.add.length : 0} 人加入拼單
                        </p>
                    </div>
                </div>


                {/* 顯示訂單連結的按鈕（只在已加入拼單或自己的拼單頁面顯示） */}
                {!showJoinButton && userId && (userId === order.main || order.add?.includes(userId)) && (
                    <div className="mt-4">
                        <a
                            href={order.order_link || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-blue-600 text-white py-2 text-center rounded-md hover:bg-blue-400 transition-colors"
                        >
                            前往訂單連結
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderCard
