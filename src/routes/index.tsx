import { createFileRoute, Link } from '@tanstack/react-router';
import { AuthGuard } from '../utils/auth';
import { supabase } from '../utils/supabase';

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
};

export const Route = createFileRoute('/')({
    beforeLoad: AuthGuard,
    loader: async () => {
        const { data, error } = await supabase
            .from('user')
            .select()

        if (error !== null) {
            throw error
        }

        return { user: data }
    },
    component: HomeIndex
})

function HomeIndex() {
    return (
        <div style={styles.container}>
            <h1>Home</h1>
            <Link to="/home/infoCard">Go to /home/infoCard</Link>
        </div>
    )
}
