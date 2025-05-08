import { Link } from '@tanstack/react-router';
import { Clock, MapPinAlt } from 'flowbite-react-icons/outline';
import { DBEvent } from '../../../backend/event/Entities/Event'; // Adjust the import path for the Event type


export default function EventCard({ event }: { event: DBEvent }) {
    let cardColor = 'bg-gray-700'; // Default color
    if (!event.img) {
        switch (event.type) {
            case 1:
                cardColor = 'bg-[#BE9A4D]'; // 揪人共乘
                break;
            case 2:
                cardColor = 'bg-[#5E9AB5]'; // 揪人運動
                break;
            case 3:
                cardColor = 'bg-[#5E9A6B]'; // 揪人遊戲
                break;
            case 4:
                cardColor = 'bg-[#BC76A8]'; // 揪人讀書
                break;
        }
    }

    return (
        <Link
            to="/events/$eventId"
            params={{ eventId: String(event.id) }}
            className="flex flex-col w-full h-64 xl:h-80 bg-white dark:bg-gray-50 rounded-lg overflow-hidden text-white cursor-pointer hover:shadow-lg transition-shadow duration-300 border border-gray-300"
        >
            {event.img ? (
                <img
                    src={event.img}
                    alt={event.name ? '圖片' + event.name : '名稱未提供'}
                    className="w-full grow object-cover"
                />
            ) : (
                <div className={`h-full ${cardColor}`} />
            )}
            <div className="p-2 h-32">
                <h3 className="text-lg mb-1 text-black truncate">{event.name}</h3>
                <p className="text-sm flex items-center text-black truncate">
                    <Clock size={24} className='mr-2' />
                    {event.start_time ? '截止於' + event.start_time.toLocaleString() : '時間未提供'}
                </p>
                <p className="text-sm flex items-center text-black truncate">
                    <MapPinAlt size={24} className='mr-2' />
                    {event.location || '位置未提供'}
                </p>
            </div>
        </Link>
    );
}