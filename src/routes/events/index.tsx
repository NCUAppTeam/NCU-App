import { createFileRoute } from '@tanstack/react-router';
import { Plus } from "flowbite-react-icons/outline";
import { useState } from 'react';
import EventController from '../../backend/event/Controllers/EventController';
import { DBEvent } from '../../backend/event/Entities/Event';
import { DialogBox } from '../../components/Common/DialogBox';
import EventCard from '../../components/pages/events/eventCard';
import SearchBar from '../../components/pages/events/searchBar';
import { AuthGuard } from '../../utils/auth';

export const Route = createFileRoute('/events/')({
  beforeLoad: AuthGuard,
  loader: async () => {
    const eventController = new EventController();

    // Fetch events using EventController
    const events = await eventController.getEvents('*');
    if (!events) throw new Error('Failed to fetch events');

    // Fetch event types using EventController
    const eventTypes = await eventController.getEventTypes();
    if (!eventTypes) throw new Error('Failed to fetch event types');

    return { events, eventTypes };
  },
  component: EventIndex,
});

function EventIndex() {
  const { events, eventTypes } = Route.useLoaderData() as {
    events: DBEvent[];
    eventTypes: { type_id: number; type_name: string }[];
  };
  const navigate = Route.useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState("All");

  const filteredEvents = events.filter((event: DBEvent) => {
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="請輸入關鍵字"
        />

        <div className="py-2 overflow-x-auto whitespace-nowrap">
          <div className="flex space-x-1">
            <button
              onClick={() => handleFilterSelect("All")}
              className={`px-4 py-1 text-sm rounded hover:bg-[#74ACF0]
                ${selectedType === "All" ? 'text-white bg-[#74ACF0] font-semibold' : 'text-[#4F4F4F] bg-[#DBEAFE]'}`}
            >
              All
            </button>
            {eventTypes.map(({ type_id, type_name }) => (
              <button
                key={type_id}
                onClick={() => handleFilterSelect(String(type_id))}
                className={`px-4 py-1 text-sm rounded hover:bg-[#74ACF0]
                  ${selectedType === String(type_id) ? 'text-white bg-[#74ACF0] font-semibold' : 'text-[#4F4F4F] bg-[#DBEAFE]'}`}
              >
                {type_name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-gray-800 p-4">
          <h1 className="ml-4 text-xl text-white">{selectedType === 'All' ? '所有揪人' : eventTypes.at(Number(selectedType) - 1)?.type_name}</h1>
          <div className="mt-2">
            <div className="grid grid-cols-2 gap-4">
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
            navigate({ to: '/events/select' });
          }}
        >
          <Plus className='m-auto' />
        </button>

        <DialogBox
          message="確定要新增嗎？"
          navigateTo="/events/select"
          type="inquiry"
        />

      </div>
    </>
  );
}

