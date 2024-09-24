import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home/infoCard')({
  component: () => <div>Hello /home/infoCard!</div>
})