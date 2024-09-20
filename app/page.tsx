'use client'

import { useUser } from "@auth0/nextjs-auth0/client";
export default function Page() {
  const { isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="page-layout">
        {/* <PageLoader /> */}
      </div>
    );
  }
  return (
    <main>
      <h1>Welcome to my gallery</h1>
    </main>
  )
}
