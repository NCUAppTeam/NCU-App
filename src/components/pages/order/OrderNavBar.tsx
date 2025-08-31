import React from 'react'
import { BiHappy } from 'react-icons/bi'
import { BsPersonRaisedHand } from 'react-icons/bs'
import { IoIosRefresh } from 'react-icons/io'
import { MdOutlineFastfood } from 'react-icons/md'
import { TbHomeHeart } from 'react-icons/tb'

interface OrderNavBarProps {
    activePage?: 'home' | 'main' | 'join' | 'create'
    className?: string
}

/**
 * 拼單功能的導航欄，用於在拼單相關頁面之間切換
 * 
 * @param activePage - 當前活躍頁面，用於高亮顯示對應按鈕
 * @param className - 可選的額外CSS類名
 */
export const OrderNavBar: React.FC<OrderNavBarProps> = ({ activePage, className = '' }) => {
    return (
        <div className={`flex space-x-2 mx-auto mt-2 ${className}`}>
            <a
                href="/order/"
                className={`flex flex-col items-center ${activePage === 'home'
                    ? 'bg-[#e3967d] ring-2 ring-[#e3967d] ring-offset-2'
                    : 'bg-[#eab3a0] hover:bg-[#eb987c]'
                    } text-white px-4 py-2 rounded-md transition-colors`}
            >
                <TbHomeHeart size={24} />
                <span className='text-[8px] mt-1'>拼單首頁</span>
            </a>

            <a
                href="/order/main"
                className={`flex flex-col items-center ${activePage === 'main'
                    ? 'bg-[#5b877c] ring-2 ring-[#5b877c] ring-offset-2'
                    : 'bg-[#84a59d] hover:bg-[#5b877c]'
                    } text-white px-4 py-2 rounded-md transition-colors`}
            >
                <BsPersonRaisedHand size={24} />
                <span className='text-[8px] mt-1'>我發起的拼單</span>
            </a>

            <a
                href="/order/join"
                className={`flex flex-col items-center ${activePage === 'join'
                    ? 'bg-[#67a5c2] ring-2 ring-[#67a5c2] ring-offset-2'
                    : 'bg-[#9dd2eb] hover:bg-[#67a5c2]'
                    } text-white px-4 py-2 rounded-md transition-colors`}
            >
                <BiHappy size={24} />
                <span className='text-[8px] mt-1'>已加入的單</span>
            </a>

            <a
                href="/order/create"
                className={`flex flex-col items-center ${activePage === 'create'
                    ? 'bg-[#15518c] ring-2 ring-[#15518c] ring-offset-2'
                    : 'bg-[#003973] hover:bg-[#15518c]'
                    } text-white px-4 py-2 rounded-md transition-colors`}
            >
                <MdOutlineFastfood size={24} />
                <span className='text-[8px] mt-1'>建立拼單</span>
            </a>

            <button
                type="button"
                onClick={() => window.location.reload()}
                className={`flex flex-col items-center bg-[#a09ea3] text-white px-4 py-2 rounded-md transition-colors`}
            >
                <IoIosRefresh size={24} />
                <span className='text-[8px] mt-1'>重新整理</span>
            </button>
        </div>
    )
}

export default OrderNavBar
