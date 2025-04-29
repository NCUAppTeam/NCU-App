import { createFileRoute, Link } from '@tanstack/react-router';
import { AuthGuard } from '../utils/auth';
import { supabase } from '../utils/supabase';

export const Route = createFileRoute('/')({
    beforeLoad: AuthGuard,
    loader: async () => {
        const userId = (await supabase.auth.getUser()).data?.user?.id
        if (!userId) {
            throw new Error('User ID is undefined')
        }
        const { data, error } = await supabase
            .from('members')
            .select(`*, identities ( identity_no, identity_name )`)
            .eq('uuid', userId)


        if (error !== null) {
            throw error
        }

        return { user: data }
    },
    component: HomeIndex
})

function HomeIndex() {
    const { user } = Route.useLoaderData()
    return (
        <>
            <div className='grid justify-items-center w-full space-y-4'>

                <div key={user[0].uuid} className='bg-blue-100 grid place-items-center'>
                    <h1>Name: {user[0].name}</h1>
                    <h1>Badge: {user[0].identities?.identity_name}</h1>
                </div>

                <Link to="/home/infoCard" className='btn btn-primary'>Go to /home/infoCard</Link>
            </div>
        </>
    )
}
