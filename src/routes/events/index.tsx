import { createFileRoute } from '@tanstack/react-router';
import { Clock, MapPinAlt, Plus, Search } from "flowbite-react-icons/outline";
import { useState } from 'react';
import { Header } from '../../components';
import { DialogBox } from '../../components/DialogBox';
import { AuthGuard } from '../../utils/auth';
import { supabase } from '../../utils/supabase';

interface Event {
  created_at: string;
  description: string | null;
  end_time: string | null;
  fee: number | null;
  id: number;
  name: string | null;
  start_time: string | null;
  type: number | null;
  user_id: string;
  location: string | null;
}

export const Route = createFileRoute('/events/')({
  beforeLoad: AuthGuard,
  loader: async () => {
    const { data, error } = await supabase.from('events').select('*');

    if (error !== null) {
      throw error;
    }
    return { events: data };
  },
  component: EventIndex,
});

function EventIndex() {
  const { events } = Route.useLoaderData();

  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredEvents = events.filter(
    (event) =>
      event.name &&
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container mx-auto">
        <Header />
        <div className="search-bar p-4 relative">
          <input
            type="text"
            placeholder={isFocused ? '請輸入關鍵字' : ''}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="input input-bordered w-full pl-12 pr-12"
          />
          {!searchTerm && !isFocused && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
              <Search className="h-5 w-10 text-gray-400" />
              <span className="ml-2 text-gray-400">搜尋</span>
            </div>
          )}
          {searchTerm && (
            <button
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setSearchTerm('')}
            >清除</button>
          )}
        </div>

        <div className="flex-1 bg-gray-800 p-4">
          <h1 className="ml-4 text-xl text-white">最新揪人</h1>
          <div className="overflow-x-auto mt-2">
            <div className="flex space-x-4">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>

          <h1 className="ml-4 text-xl text-white mt-8">最新活動</h1>
          <div className="overflow-x-auto mt-2">
            <div className="flex space-x-4">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>

        <button
          className="grid place-items-center btn btn-circle fixed right-4 bottom-4 "
          onClick={() => {
            if (document) {
              (
                document.getElementById('ncuapp_modal') as HTMLFormElement
              ).showModal();
            }
          }}
        >
          <Plus className='m-auto' />
        </button>

        <DialogBox
          message="確定要新增嗎？"
          navigateTo="/events/create"
          type="inquiry"
        />

      </div>
    </>
  );
}

function EventCard({ event }: { event: Event }) {
  const startTime = event.start_time
    ? new Date(event.start_time)
    : new Date();
  return (
    <div className="flex-shrink-0 w-40 rounded-lg overflow-hidden text-white">
      <div className="h-32 bg-gray-500" />
      <div className="p-2 bg-white">
        <h3 className="text-lg mb-1 text-black">{event.name}</h3>
        <p className="text-sm flex items-center text-black">
          <Clock size={24} />
          {startTime.toLocaleString('zh-TW', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <p className="text-sm flex items-center text-black">
          <MapPinAlt size={24} />
          {event.location || '位置未提供'}
        </p>
      </div>
    </div>
  );
}