import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '../../utils/supabase';

export const Route = createFileRoute('/events/$eventId')({
  loader: async ({ params: { eventId } }) => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single()

    if (error !== null) {
      throw error
    }

    return { event: data }
  },
  component: EventDetails
})

function EventDetails() {
  const { event } = Route.useLoaderData()
  return (
    <div>
      <div>Event ID: {event.id}</div>
      <div>Event Name: {event.name}</div>
      <div>Event Description: {event.description}</div>
    </div>
  )
}
