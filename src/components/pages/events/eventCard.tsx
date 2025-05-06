import { Link } from '@tanstack/react-router';
import { Clock, MapPinAlt } from 'flowbite-react-icons/outline';
import { DBEvent } from '../../../backend/event/Entities/Event'; // Adjust the import path for the Event type


export default function EventCard({ event }: { event: DBEvent }) {
    return (
        <Link
            to="/events/$eventId"
            params={{ eventId: String(event.id) }}
            className="w-full rounded-lg overflow-hidden text-white cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
            <div className="h-32 bg-gray-500" />
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