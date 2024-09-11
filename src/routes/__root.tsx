import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <div>
          <span>NCU App</span>
        </div>
        <Link to="/events" className="[&.active]:font-bold">
          Events
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})
