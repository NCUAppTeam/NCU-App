import { createFileRoute } from '@tanstack/react-router'
import { Header } from '../../components'
import { DinnerCard } from '../../components/pages/dinner/dinnercard'
import { MySpinWheel } from '../../components/pages/dinner/spinwheel'
import { AuthGuard } from '../../utils/auth'
import { supabase } from '../../utils/supabase'


export const Route = createFileRoute('/dinner/')({
    beforeLoad: AuthGuard,
    loader: async () => {
        const { data: events, error: eventsError } = await supabase.from('restaurant').select('*');
        if (eventsError) throw eventsError;

        const { data: eventTypesData, error: eventTypesError } = await supabase.from('event_type').select('*').order('type_id', { ascending: true });
        if (eventTypesError) throw eventTypesError;
        console.log(eventTypesData);
        return { events, eventTypes: eventTypesData };
    },
    component: DinnerIndex,
})

function DinnerIndex() {
    return (
        <>
            <Header />
            {/* <Filter /> */}
            <DinnerCard />
            <MySpinWheel />
        </>
    )
}