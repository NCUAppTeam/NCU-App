import { createFileRoute } from '@tanstack/react-router';
import { Plus } from "flowbite-react-icons/outline";
import { useState } from 'react';
import EventController from '../../backend/event/Controllers/EventController';
import { DBEvent } from '../../backend/event/Entities/Event';
import { DialogBox } from '../../components/Common/DialogBox';
import typeColor from '../../components/pages/events/colorForEvents.ts';
import EventCard from '../../components/pages/events/eventCard';
import SearchBar from '../../components/pages/events/searchBar';
import textForEvents from '../../components/pages/events/textForEvents.ts';
import { AuthGuard } from '../../utils/auth';

export const Route = createFileRoute('/events/')({
  beforeLoad: AuthGuard,
  loader: async () => {
    const eventController = new EventController();

    // Fetch events using EventController
    const events = await eventController.getActiveEvents('*');
    if (!events) throw new Error('Failed to fetch events');

    // Fetch event types using EventController
    const eventTypes = await eventController.getEventTypes();
    if (!eventTypes) throw new Error('Failed to fetch event types');

    return { events, eventTypes };
  },
  component: EventIndex,
});

function EventIndex() {

  const getFewEventsText = (type: number) => {
    const textList = textForEvents[type as keyof typeof textForEvents];
    const randomIndex = Math.floor(Math.random() * textList.length);
    return textList[randomIndex];
  };


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
      <div className="px-4 sm:px-6 lg:px-8 h-screen pb-4 w-full">

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



        <div className="relative flex-1 bg-gray-50 shadow dark:bg-gray-700 px-4 rounded-lg h-5/6">
          <h1 className={`py-2 text-xl text-black dark:text-white underline underline-offset-8`} style={{ textDecorationColor: typeColor[Number(selectedType) - 1] }}>
            {selectedType === 'All' ? '所有揪人' : eventTypes.at(Number(selectedType) - 1)?.type_name}
          </h1>
          <div className="mt-2">
            <div className="grid grid-cols-2 gap-4 overflow-y-auto">
              {filteredEvents.length >= 0 && filteredEvents.length < 5 && (
                <div className="col-span-2 text-center text-white">
                  <p className="px-2 break-all text-center text-gray-500 py-2 bg-yellow-50 rounded shadow">
                    {selectedType === 'All'
                      ? '快來加入或發起更多揪人吧！'
                      : getFewEventsText(Number(selectedType))}
                  </p>
                </div>
              )}
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* Add Events Button */}
            <div className="absolute bottom-2 right-3">
              <button
                className="btn btn-circle bg-gray-50 hover:bg-gray-400 border-1 border-gray-300 text-gray-700 hover:text-white shadow-lg transition duration-300 ease-in-out"
                aria-label="Create new event"
                onClick={() => {
                  navigate({ to: '/events/select' });
                }}
              >
                <Plus className='m-auto' />
              </button>
            </div>

            <DialogBox
              message="確定要新增嗎？"
              navigateTo="/events/select"
              type="inquiry"
            />
          </div>
        </div>



      </div>
    </>
  );
}

