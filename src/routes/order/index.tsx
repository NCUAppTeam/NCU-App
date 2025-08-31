import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import OrderController from '../../backend/order/Controllers/OrderController'
import Order from '../../backend/order/Entities/Order'
import { OrderCard, OrderNavBar } from '../../components'
import { UserController } from '../../controllers/user'
import { AuthGuard } from '../../utils/auth'

export const Route = createFileRoute('/order/')({
    beforeLoad: AuthGuard,
    loader: async () => {
        const orderController = new OrderController()

        // Fetch orders using OrderController
        const orders = await orderController.getActiveOrders()

        return { orders }
    },
    component: OrderIndex,
})

function OrderIndex() {
    const { orders } = Route.useLoaderData() as {
        orders: Order[]
    }
    const [userId, setUserId] = useState<string | null>(null)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [showLinkDialog, setShowLinkDialog] = useState(false)
    const [isJoining, setIsJoining] = useState(false)
    const [joinError, setJoinError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchUser() {
            const user = await UserController.get()
            setUserId(user ? user.id : null)
        }
        fetchUser()
    }, [])

    // 處理"拼單"按鈕點擊事件
    const handleJoinClick = (order: Order) => {
        setSelectedOrder(order)
        setShowConfirmDialog(true)
    }

    // 處理確認拼單
    const handleConfirmJoin = async () => {
        if (!selectedOrder || !userId) return;

        setIsJoining(true);
        setJoinError(null);

        try {
            const orderController = new OrderController();
            const result = await orderController.joinOrder(selectedOrder.order_id, userId);

            if (!result) {
                throw new Error('加入拼單失敗，請稍後再試');
            }

            setShowConfirmDialog(false);
            setShowLinkDialog(true);
        } catch (error) {
            if (error instanceof Error) {
                setJoinError(error.message);
            } else {
                setJoinError('加入拼單時發生未知錯誤');
            }
        } finally {
            setIsJoining(false);
        }
    }

    // 處理關閉連結對話框
    const handleCloseLinkDialog = () => {
        setShowLinkDialog(false)
        setSelectedOrder(null)
        window.location.reload()
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">拼單首頁</h1>
                <OrderNavBar activePage="home" />
            </div>

            {orders && orders.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                    {orders.map((order) => (
                        <OrderCard
                            key={order.order_id}
                            order={order}
                            userId={userId}
                            onJoinClick={handleJoinClick}
                            showJoinButton={true}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <h2 className="text-lg font-semibold text-gray-700">
                        目前沒有可用的拼單
                    </h2>
                    <p className="text-gray-500 mt-2">您可以建立新的拼單讓其他人加入</p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                        <a href="/order/create">建立拼單</a>
                    </button>
                </div>
            )}

            {/* 確認拼單對話框 */}
            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h2 className="text-xl font-semibold mb-4">確認加入拼單</h2>
                        <p className="text-gray-700">
                            您即將加入「{selectedOrder?.restaurant || ''}」的拼單。
                        </p>
                        <p className="text-red-500 font-medium mt-2">
                            請注意：加入拼單後將無法退出，確定要繼續嗎？
                        </p>
                        {joinError && (
                            <div className="mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                                {joinError}
                            </div>
                        )}
                        <div className="flex justify-end mt-6 gap-2">
                            <button
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                onClick={() => setShowConfirmDialog(false)}
                                disabled={isJoining}
                            >
                                取消
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                                onClick={handleConfirmJoin}
                                disabled={isJoining}
                            >
                                {isJoining ? '處理中...' : '確認加入'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 顯示訂單連結對話框 */}
            {showLinkDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h2 className="text-xl font-semibold mb-4">訂單連結</h2>
                        <p className="text-gray-700 mb-2">
                            您已成功加入拼單！請使用以下連結開始點餐：
                        </p>
                        <div className="bg-gray-100 p-3 rounded-lg break-all">
                            <a
                                href={selectedOrder?.order_link || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {selectedOrder?.order_link || '連結不可用'}
                            </a>
                        </div>
                        <div className="mt-4 text-gray-700">
                            <p className="mb-2">您可以在「我加入的拼單」頁面查看所有您加入的拼單及其連結。</p>
                        </div>
                        <div className="flex justify-end mt-6 space-x-2">
                            <a
                                href="/order/join"
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                查看我的拼單
                            </a>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                onClick={handleCloseLinkDialog}
                            >
                                關閉
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
