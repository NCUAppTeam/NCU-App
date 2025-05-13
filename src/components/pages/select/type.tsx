import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import EventController from '../../../backend/event/Controllers/EventController.ts';
import { EventType } from '../../../backend/event/Entities/EventType.ts';
import typeColor from '../events/constants/colorForEvents.ts';

export default function TypeContent() {

  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const eventController = new EventController();
    async function fetchEventTypes() {
      try {
        setLoading(true);
        // Fetch only the big types (where hashtag_relation contains 0)
        const eventTypes = await eventController.getEventTypes();

        if (!eventTypes) throw new Error('Failed to fetch event types');
        setEventTypes(eventTypes || []);
      } catch (error) {
        console.error('Error fetching event types:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEventTypes();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="mb-4 text-2xl text-center text-gray-700 font-bold dark:text-white" >選擇種類</h2 >

        <div className="flex w-2/3 flex-col justify-center">
          {loading ? (
            <div className="text-center py-8">載入中...</div>
          ) : (
            eventTypes.map((type) => (
              <Link
                key={type.type_id}
                to="/events/create"
                search={{ type: type.type_id.toString() }}
                className="flex flex-row card bg-neutral-content dark:bg-gray-100 rounded-box h-16 justify-center items-center text-gray-800 font-bold text-2xl mb-8 hover:scale-105 transition-transform"
              >
                <p className={`w-6 h-6 rounded-full m-2`} style={{ backgroundColor: typeColor[type.type_id - 1] }}></p>
                {type.type_name}
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}