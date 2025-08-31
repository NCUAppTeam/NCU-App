import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import OrderController from '../../backend/order/Controllers/OrderController'
import { OrderNavBar } from '../../components'
import { UserController } from '../../controllers/user'
import { AuthGuard } from '../../utils/auth'

export const Route = createFileRoute('/order/create')({
    beforeLoad: AuthGuard,
    component: CreateOrder,
})

function CreateOrder() {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        restaurant: '',
        due: '',
        pickup: '',
        order_link: '',
        payment: '',
        ps: '',
    })
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            // 基本驗證
            if (!formData.restaurant.trim()) {
                throw new Error('請輸入餐廳名稱')
            }
            if (!formData.due) {
                throw new Error('請選擇截止時間')
            }
            if (!formData.pickup.trim()) {
                throw new Error('請輸入取餐地點')
            }
            if (!formData.payment) {
                throw new Error('請選擇收款方式')
            }
            if (!formData.order_link.trim()) {
                throw new Error('請輸入訂單連結')
            }

            // 檢查截止時間是否有效
            const dueDate = new Date(formData.due)
            const now = new Date()
            if (dueDate <= now) {
                throw new Error('截止時間必須晚於現在')
            }

            const orderController = new OrderController()
            const newOrder = await orderController.createOrder({
                restaurant: formData.restaurant,
                main: (await UserController.get()).id,
                due: formData.due,
                pickup: formData.pickup,
                payment: Number(formData.payment) === 1,
                ps: formData.ps,
                order_link: formData.order_link,
                add: [], // 初始沒有其他參與者
            })

            if (!newOrder) {
                throw new Error('建立訂單失敗，請稍後再試')
            }

            // 成功建立
            setSuccess(true)
            setTimeout(() => {
                navigate({ to: '/order' })
            }, 2000)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('發生未知錯誤')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    // 取得目前時間作為最小日期時間的值
    const getMinDateTime = () => {
        const now = new Date()
        return now.toISOString().slice(0, 16) // 格式: YYYY-MM-DDTHH:MM
    }

    return (
        <div className="container mx-auto p-4 max-w-md">
            <div className="flex flex-col justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">建立拼單</h1>
                <OrderNavBar activePage="create" />
            </div>

            {success ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    <p className="font-semibold">拼單已成功建立！</p>
                    <p className="text-sm">正在返回拼單列表頁面...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        {/* 注意事項 */}
                        <div className="mt-4 bg-sky-50 p-3">
                            <h4 className="font-semibold">注意事項</h4>
                            <ul className="list-disc list-inside">
                                <li>尚未提供編輯和刪除拼單功能，故請確認所有資訊正確無誤後再提交，謝謝配合！</li>
                                <li>我們不負責任何金錢糾紛處理，若有跑單情形，僅提供資訊，後續需自行處理，煩請見諒。</li>
                            </ul>
                        </div>

                        <label
                            htmlFor="restaurant"
                            className="block text-sm font-medium text-gray-700 mt-3"
                        >
                            餐廳名稱 <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="text"
                            id="restaurant"
                            name="restaurant"
                            value={formData.restaurant}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
                            placeholder="例如：小木屋鬆餅"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="due"
                            className="block text-sm font-medium text-gray-700"
                        >
                            截止時間 <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="datetime-local"
                            id="due"
                            name="due"
                            value={formData.due}
                            min={getMinDateTime()}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            截止時間後將不再接受新的拼單加入
                        </p>
                    </div>

                    <div>
                        <label
                            htmlFor="payment"
                            className="block text-sm font-medium text-gray-700"
                        >
                            收款方式 <span className='text-red-500'>*</span>
                        </label>
                        <select
                            id="payment"
                            name="payment"
                            value={formData.payment}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
                            required
                        >
                            <option value="">請選擇收款方式</option>
                            <option value={0}>先付款</option>
                            <option value={1}>現場付</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="pickup"
                            className="block text-sm font-medium text-gray-700"
                        >
                            取餐地點和時間 <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="text"
                            id="pickup"
                            name="pickup"
                            value={formData.pickup}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
                            placeholder="例如：9/1 中午12:15 工五1樓門口"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="order_link"
                            className="block text-sm font-medium text-gray-700"
                        >
                            訂單連結 <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="url"
                            id="order_link"
                            name="order_link"
                            value={formData.order_link}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
                            placeholder="https://example.com/order"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            有效之共享訂單連結，例如：UberEats/FoodPanda 共享連結、Google文件等
                        </p>
                    </div>

                    <div>
                        <label
                            htmlFor="ps"
                            className="block text-sm font-medium text-gray-700"
                        >
                            備註
                        </label>
                        <input
                            type="text"
                            id="ps"
                            name="ps"
                            value={formData.ps}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
                            placeholder=""
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            例如：11:00 工五211教室收款；領餐時間10分鐘，逾時不候；不提供找零，請準備剛好的錢，可linepay
                        </p>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate({ to: '/order' })}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            disabled={isSubmitting}
                        >
                            取消
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? '處理中...' : '建立拼單'}
                        </button>
                    </div>
                </form>
            )
            }
        </div >
    )
}
