import { createFileRoute } from '@tanstack/react-router';
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
        const events = await eventController.getUserCreatedEvents(uuid);
        return { events };
    },
    component: HomeIndex
})

function HomeIndex() {
    const { events } = Route.useLoaderData() as { events: Event[] };

    return (
        <>
            <div className='grid justify-items-center w-full space-y-4'>
                {events && events.map((event: Event) => (
                    <EventCard key={event.id} event={event} />
                ))}
                <SchoolCalendar />
            </div>
        </>
    )
}
