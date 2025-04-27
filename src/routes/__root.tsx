import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className='w-full lg:w-2/3 mx-auto'>
      <Outlet />
    </div>
  )
}
