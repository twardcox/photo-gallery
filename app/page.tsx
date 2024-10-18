'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Header from '@/components/Header';
export default function Page() {
  const { isLoading } = useUser();

  if (isLoading) {
    return <div className="page-layout">{/* <PageLoader /> */}</div>;
  }
  return (
    <>
      <Header />
      <h1>Welcome to my gallery</h1>
    </>
  );
}
