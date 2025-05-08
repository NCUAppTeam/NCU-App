import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '../../../utils/supabase';
import typeColor from '../events/colorForEvents.ts';

interface EventType {
  type_id: number;
  type_name: string;
  hashtag_relation: number[];
}

interface TypeContentProps {
  onNext: () => void;
}

export default function TypeContent({ onNext }: TypeContentProps) {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEventTypes() {
      try {
        setLoading(true);
        // Fetch only the big types (where hashtag_relation contains 0)
        const { data, error } = await supabase
          .from('event_type')
          .select('*')
          .contains('hashtag_relation', [0])
          .order('type_id', { ascending: true });

        if (error) throw error;
        setEventTypes(data || []);
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
      <div className="flex items-center justify-center">
        <div className="flex w-2/3 flex-col justify-center">
          {loading ? (
            <div className="text-center py-8">載入中...</div>
          ) : (
            eventTypes.map((type) => (
              <Link
                key={type.type_id}
                to="/events/create"
                search={{ type: type.type_id.toString() }}
                className="flex flex-row card bg-neutral-content dark:bg-gray-100 rounded-box h-20 justify-center items-center text-gray-800 font-bold text-2xl mb-8 hover:scale-105 transition-transform"
                onClick={onNext}
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