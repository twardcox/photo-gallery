'use client';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

import { ReactNode } from 'react';
import Header from './Header';

interface PageProps {
  children: ReactNode;
}

export default withPageAuthRequired(function Page({ children }: PageProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
});

// const PageLayout = ({ children }) => {
//   return (
//     <>
//       <Header />
//       {children}
//     </>
//   )
// }

// export default PageLayout;
