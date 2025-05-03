import { createFileRoute } from '@tanstack/react-router';
import { SchoolCalendar } from '../components/pages/home/schoolCalendar';
import { AuthGuard } from '../utils/auth';

export const Route = createFileRoute('/')({
    beforeLoad: AuthGuard,
    component: HomeIndex
})

function HomeIndex() {
    return (
        <>
            <div className='grid justify-items-center w-full space-y-4'>
                <SchoolCalendar />
            </div>
        </>
    )
}
