import { createFileRoute, Link } from '@tanstack/react-router';
import { supabase } from '../../utils/supabase';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
};

export const Route = createFileRoute('/events/')({
  loader: async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')

    if (error !== null) {
      throw error
    }

    return { events: data }
  },
  component: EventIndex
})

function EventIndex() {
  const { events } = Route.useLoaderData()
  return (
    <div style={styles.container}>
      <h1 style={{ marginLeft: 140 }} className='text-lg text-white'>活動列表</h1>
      {
        events.map((event) => (
          <Link to='/events/$eventId' params={{ eventId: event.id.toString() }} >{event.name}</Link>
        ))
      }
    </div>
  )
}
