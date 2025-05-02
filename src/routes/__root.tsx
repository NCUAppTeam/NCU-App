import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Header } from '../components/pages/home/Header';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {

  return (
    <div className='w-full lg:w-2/3 mx-auto flex flex-col lg:flex-row justify-center'>
      <Header />
      <Outlet />
    </div>
  );
}
