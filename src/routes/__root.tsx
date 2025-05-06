import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import AcornLoading from '../components/pages/home/AcornLoading';
import { Header } from '../components/pages/home/Header';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const isRoutePending = useRouterState({
    select: (s) => s.status === 'pending',
  });

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isRoutePending) {
      // Introduce a slight delay before showing the loader
      timeout = setTimeout(() => {
        setShowLoader(true);
      }, 10); // delay before showing loader
    } else {
      // When loading is done, give loader time to finish animation before hiding
      timeout = setTimeout(() => {
        setShowLoader(false);
      }, 1000); // delay to smooth out transition
    }

    return () => clearTimeout(timeout);
  }, [isRoutePending]);

  return (
    <div className='w-full lg:w-2/3 mx-auto flex flex-col lg:flex-row justify-center'>
      <Header />
      {showLoader ? <AcornLoading /> : <Outlet />}
    </div>
  );
}
