'use client'

import '../styles/global.scss';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { UserProvider } from "@auth0/nextjs-auth0/client";


// Create a client
const queryClient = new QueryClient()


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <body>
            {children}
          </body>
        </QueryClientProvider>
      </UserProvider>
    </html>
  )
}
