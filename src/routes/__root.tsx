import { createRootRoute, Outlet } from '@tanstack/react-router'
import { HStack } from '../components'
import { DrawerSideBar } from '../components/DrawerSideBar'
export const Route = createRootRoute({

  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <div className="p-2 gap-2 justify-start">
        <HStack className='bg-rose-300 items-center'>
          <DrawerSideBar />
          <div className='flex flex-1 justify-center'>
            <span className=''>NCU App</span>
          </div>
        </HStack>
      </div>

      <Outlet />
    </ >
  )
}
