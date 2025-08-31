import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import OrderController from '../../backend/order/Controllers/OrderController'
import Order from '../../backend/order/Entities/Order'
import { OrderCard, OrderNavBar } from '../../components'
import { UserController } from '../../controllers/user'
import { AuthGuard } from '../../utils/auth'

export const Route = createFileRoute('/order/join')({
    beforeLoad: AuthGuard,
    component: JoinedOrdersPage,
})

function JoinedOrdersPage() {
    const [joinedOrders, setJoinedOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>(null)

    useEffect(() => {
        async function fetchJoinedOrders() {
            try {
                setLoading(true)
                const user = await UserController.get()
                if (!user) {
                    setError('無法獲取使用者資訊')
                    return
                }
                setUserId(user.id)

                const orderController = new OrderController()
                const orders = await orderController.getUserJoinedOrders(user.id)

                if (!orders) {
                    setError('獲取拼單數據失敗')
                    return
                }

                setJoinedOrders(orders)
                setError(null)
            } catch (err) {
                console.error('Error fetching joined orders:', err)
                setError('獲取已加入的拼單時發生錯誤')
            } finally {
                setLoading(false)
            }
        }

        fetchJoinedOrders()
    }, [])

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">已加入拼單</h1>
                <OrderNavBar activePage="join" />
            </div>

            {loading && (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {!loading && !error && joinedOrders.length === 0 && (
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <h2 className="text-lg font-semibold text-gray-700">
                        您尚未加入任何拼單
                    </h2>
                    <p className="text-gray-500 mt-2">
                        可以在「可用的拼單」頁面瀏覽並加入拼單
                    </p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                        <a href="/order/">瀏覽可用拼單</a>
                    </button>
                </div>
            )}

            {!loading && joinedOrders.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                    {joinedOrders.map((order) => (
                        <OrderCard
                            key={order.order_id}
                            order={order}
                            userId={userId}
                            showJoinButton={false}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
