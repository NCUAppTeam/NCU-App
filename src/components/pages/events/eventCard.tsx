import { Link } from '@tanstack/react-router';
import { Clock, MapPinAlt } from 'flowbite-react-icons/outline';
import Event from '../../../backend/event/Entities/Event';

export default function EventCard({ event }: { event: Event }) {
    let cardColor = 'bg-gray-700';
    if (!event.img || event.img.length === 0) {
        switch (event.type) {
            case 1: cardColor = 'bg-[#BE9A4D]'; break;
            case 2: cardColor = 'bg-[#5E9AB5]'; break;
            case 3: cardColor = 'bg-[#5E9A6B]'; break;
            case 4: cardColor = 'bg-[#BC76A8]'; break;
            case 5: cardColor = 'bg-[#A65E9A]'; break;
        }
    }


    return (
        <Link
            to="/events/$eventId"
            params={{ eventId: String(event.id) }}
            className="flex flex-col w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700
                       h-64 sm:h-72 md:h-80" // Responsive card height
        >
            <div className="h-[70%] w-full relative overflow-hidden"> {/* Use arbitrary value for 70% height */}
                {event.img && event.img.length > 0 ? (
                    <img
                        src={event.img[0]}
                        alt={event.name ? `Image for ${event.name}` : 'Event image'}
                        className="w-full h-full object-cover" // Image fills its 70% container
                    />
                ) : (
                    <div className={`w-full h-full flex items-center justify-center ${cardColor}`}>
                        {/* Optional placeholder content */}
                    </div>
                )}
            </div>

            <div className="h-[30%] w-full p-2 sm:p-3 flex flex-col justify-center overflow-hidden"> {/* Use arbitrary value for 30% height and reduced padding */}
                <h3 className="text-sm sm:text-base font-semibold mb-0.5 text-gray-900 dark:text-white truncate"> {/* Adjusted font size and margin */}
                    {event.name || '未命名活動'}
                </h3>
                <p className="text-s flex items-center text-gray-600 dark:text-gray-300 truncate">
                    <Clock size={14} className='mr-1 sm:mr-1.5 flex-shrink-0' /> {/* Adjusted icon size and margin */}
                    {event.startTime ? `${new Date(event.startTime).toLocaleDateString([], { month: '2-digit', day: '2-digit', timeZone: 'UTC' })} ${new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })}` : '時間未提供'}
                </p>
                <p className="text-s flex items-center text-gray-600 dark:text-gray-300 truncate">
                    <MapPinAlt size={14} className='mr-1 sm:mr-1.5 flex-shrink-0' /> {/* Adjusted icon size and margin */}
                    {event.meeting_point || '未提供集合點'}
                </p>
            </div>
        </Link>
    );
}