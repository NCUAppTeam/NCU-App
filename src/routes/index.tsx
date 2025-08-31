import { createFileRoute } from '@tanstack/react-router';
import { AngleDown } from 'flowbite-react-icons/outline';
import { useState } from 'react';
import EventController from '../backend/event/Controllers/EventController';
import Event from '../backend/event/Entities/Event';
import EventCard from '../components/pages/events/eventCard';
import { SchoolCalendar } from '../components/pages/home/schoolCalendar';
import { UserController } from '../controllers/user';
import { AuthGuard } from '../utils/auth';

export const Route = createFileRoute('/')({
    beforeLoad: AuthGuard,
    loader: async () => {
        const uuid = (await UserController.get()).id
        const eventController = new EventController();
        const hostedEvents = await eventController.getUserCreatedEvents(uuid);
        const favoriteEvents = await eventController.getFavoriteEvents(uuid);
        const acceptedEvents = await eventController.getUserAcceptedEvents(uuid);
        return { hostedEvents, favoriteEvents, acceptedEvents };
    },
    component: HomeIndex
})

function HomeIndex() {
    const { hostedEvents } = Route.useLoaderData() as { hostedEvents: Event[] };
    const { favoriteEvents } = Route.useLoaderData() as { favoriteEvents: Event[] };
    const { acceptedEvents } = Route.useLoaderData() as { acceptedEvents: Event[] };
    const [collapsed, setCollapsed] = useState(true);
    const [collapsedFav, setCollapsedFav] = useState(true);
    const [collapsedAccepted, setCollapsedAccepted] = useState(true);

    return (
        <>

            <div className='flex flex-col justify-center items-center w-full px-4 sm:px-6 lg:px-8 mb-4 mt-4'>
                <h1 className='text-2xl font-bold'>歡迎來到 NCU App</h1>
                <p className='text-lg'>這裡是你的個人揪人管理頁面</p>
            </div>
            <div className='flex flex-col justify-center items-center w-full px-4 sm:px-6 lg:px-8 mb-4 mt-4'>
                <div className="flex items-center w-full justify-between max-w-2xl">
                    <div>
                        <h2 className='text-xl font-semibold'>你創建的揪人({hostedEvents.length})</h2>
                    </div>
                    <button
                        className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded transition"
                        onClick={() => setCollapsed(c => !c)}
                        aria-label={collapsed ? "展開列表" : "收合列表"}
                    >
                        {collapsed ? (
                            <AngleDown className="w-5 h-5 transform transition-transform" />
                        ) : (
                            <AngleDown className="w-5 h-5 transform rotate-180 transition-transform" />
                        )}
                    </button>
                </div>
            </div>
            {!collapsed && (
                <div className="w-full overflow-x-auto py-2">
                    <div className="flex flex-row space-x-4 min-w-max mx-10">
                        {hostedEvents.length > 0 ? hostedEvents.map((event: Event) => (
                            <EventCard key={event.id} event={event} />
                        )) : (
                            <p className='text-gray-500'>你還沒有創建任何揪人</p>
                        )}
                    </div>
                </div>
            )}
            <div className='flex flex-col justify-center items-center w-full px-4 sm:px-6 lg:px-8 mb-4 mt-4'>
                <div className="flex items-center w-full justify-between max-w-2xl">
                    <div>
                        <h2 className='text-xl font-semibold'>你收藏的揪人({favoriteEvents.length})</h2>
                    </div>
                    <button
                        className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded transition"
                        onClick={() => setCollapsedFav(c => !c)}
                        aria-label={collapsedFav ? "展開列表" : "收合列表"}
                    >
                        {collapsedFav ? (
                            <AngleDown className="w-5 h-5 transform transition-transform" />
                        ) : (
                            <AngleDown className="w-5 h-5 transform rotate-180 transition-transform" />
                        )}
                    </button>
                </div>
            </div>
            {!collapsedFav && (
                <div className="w-full overflow-x-auto py-2">
                    <div className="flex flex-row space-x-4 min-w-max mx-10">
                        {favoriteEvents.length > 0 ? favoriteEvents.map((event: Event) => (
                            <EventCard key={event.id} event={event} />
                        )) : (
                            <p className='text-gray-500'>你還沒有收藏任何揪人</p>
                        )}
                    </div>
                </div>
            )}
            <div className='flex flex-col justify-center items-center w-full px-4 sm:px-6 lg:px-8 mb-4 mt-4'>
                <div className="flex items-center w-full justify-between max-w-2xl">
                    <div>
                        <h2 className='text-xl font-semibold'>你正取的揪人({acceptedEvents.length})</h2>
                    </div>
                    <button
                        className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded transition"
                        onClick={() => setCollapsedAccepted(c => !c)}
                        aria-label={collapsedFav ? "展開列表" : "收合列表"}
                    >
                        {collapsedAccepted ? (
                            <AngleDown className="w-5 h-5 transform transition-transform" />
                        ) : (
                            <AngleDown className="w-5 h-5 transform rotate-180 transition-transform" />
                        )}
                    </button>
                </div>
            </div>
            {!collapsedAccepted && (
                <div className="w-full overflow-x-auto py-2">
                    <div className="flex flex-row space-x-4 min-w-max mx-10">
                        {acceptedEvents.length > 0 ? acceptedEvents.map((event: Event) => (
                            <EventCard key={event.id} event={event} />
                        )) : (
                            <p className='text-gray-500'>你還沒有任何正取的揪人</p>
                        )}
                    </div>
                </div>
            )}

            <div className='grid justify-items-center w-full space-y-4'>
                <SchoolCalendar />
            </div>
        </>
    )
}
