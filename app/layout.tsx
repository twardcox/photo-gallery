'use client'

import '../styles/global.scss';
import Header from '../components/Header';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { UserProvider } from "@auth0/nextjs-auth0/client";
// import { PageLoader } from "@/components/page-loader";


// Create a client
const queryClient = new QueryClient()


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <Header />
            {children}
          </QueryClientProvider>
        </UserProvider>
      </body>
    </html>
  )
}
