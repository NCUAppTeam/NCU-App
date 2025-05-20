import { createFileRoute } from '@tanstack/react-router';
import EventController from '../backend/event/Controllers/EventController';
import { DBEvent } from '../backend/event/Entities/Event';
import EventCard from '../components/pages/events/eventCard';
import { SchoolCalendar } from '../components/pages/home/schoolCalendar';
import { UserController } from '../controllers/user';
import { AuthGuard } from '../utils/auth';

export const Route = createFileRoute('/')({
    beforeLoad: AuthGuard,
    loader: async () => {
        const uuid = (await UserController.get()).id
        const eventController = new EventController();
        const events = await eventController.getUserCreatedEvents(uuid);
        return { events };
    },
    component: HomeIndex
})

function HomeIndex() {
    const { events } = Route.useLoaderData() as { events: DBEvent[] };
    
    return (
        <>
            <div className='grid justify-items-center w-full space-y-4'>
                {events.map((event: DBEvent) => (
                    <EventCard key={event.id} event={event} />
                ))}
                <SchoolCalendar />
            </div>
        </>
    )
}
