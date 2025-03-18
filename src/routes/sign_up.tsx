import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sign_up')({
  component: () => <div>Hello /sign_up!</div>,
})
