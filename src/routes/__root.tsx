import { createRootRoute, Outlet, useMatchRoute } from '@tanstack/react-router';
import { Header } from '../components/pages/home/Header';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const match = useMatchRoute();

  return (
    <div className='w-full lg:w-2/3 mx-auto flex flex-col lg:flex-row justify-center'>
      {match({ to: '/login' }) ? null : <Header />}
      <Outlet />
    </div>
  );
}
