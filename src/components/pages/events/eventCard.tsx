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
            className="w-full rounded-lg overflow-hidden text-white cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
            {event.img ? (
                <img
                    src={event.img}
                    alt={event.name ? '圖片' + event.name : '名稱未提供'}
                    className="w-full h-32 object-cover"
                />
            ) : (
                <div className={`h-32 ${cardColor}`} />
            )}
            <div className="p-2 bg-white">
                <h3 className="text-lg mb-1 text-black">{event.name}</h3>
                <p className="text-sm flex items-center text-black">
                    <Clock size={24} />
                    {event.start_time ? event.start_time.toLocaleString() : '時間未提供'}
                </p>
                <p className="text-sm flex items-center text-black">
                    <MapPinAlt size={24} />
                    {event.location || '位置未提供'}
                </p>
            </div>
        </Link>
    );
}