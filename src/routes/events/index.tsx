import { createFileRoute } from '@tanstack/react-router';
import { Clock, MapPinAlt, Plus, Search } from "flowbite-react-icons/outline";
import { useState } from 'react';
import { Header } from '../../components';
import { DialogBox } from '../../components/Common/DialogBox';
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
    const { data: events, error: eventsError } = await supabase.from('events').select('*');
    if (eventsError) throw eventsError;

    const { data: eventTypesData, error: eventTypesError } = await supabase.from('event_type').select('*').order('type_id', { ascending: true });
    if (eventTypesError) throw eventTypesError;
    console.log(eventTypesData);
    return { events, eventTypes: eventTypesData };
  },
  component: EventIndex,
});

function EventIndex() {
  const { events, eventTypes } = Route.useLoaderData() as {
    events: Event[];
    eventTypes: { type_id: number; type_name: string }[];
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedType, setSelectedType] = useState("All");

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name && event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All"
      ? true
      : event.type === Number(selectedType);
    return matchesSearch && matchesType;
  });

  const handleFilterSelect = (type: string) => {
    setSelectedType(type);
  };

  return (
    <>
      <div className="container mx-auto">
        <Header />
        <div className="search-bar pt-4 pb-2 pl-4 pr-4 relative">
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
            >
              清除
            </button>
          )}
        </div>

        <div className="px-2 py-2 overflow-x-auto whitespace-nowrap">
          <div className="flex space-x-1">
            <button
              onClick={() => handleFilterSelect("All")}
              className={`px-4 py-1 text-sm rounded text-gray-500 hover:bg-gray-600
                ${selectedType === "All" ? 'text-white bg-gray-200 font-semibold' : 'bg-gray-200'}`}
            >
              All
            </button>
            {eventTypes.map(({ type_id, type_name }) => (
              <button
                key={type_id}
                onClick={() => handleFilterSelect(String(type_id))}
                className={`px-4 py-1 text-sm rounded text-gray-500 hover:bg-gray-600
                  ${selectedType === String(type_id) ? 'text-white bg-gray-200 font-semibold' : 'bg-gray-200'}`}
              >
                {type_name}
              </button>
            ))}
          </div>
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
          aria-label="Create new event"
          onClick={() => {
            const dialog = document.querySelector('dialog.modal') as HTMLDialogElement;
            if (dialog) dialog.showModal();
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