import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/events/$eventId')({
  component: EventDetails
})

function EventDetails() {
  const { eventId } = useParams({ strict: false })
  return <div>Event {eventId}</div>
}
