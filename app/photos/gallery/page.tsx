'use client'

import { useQuery } from '@tanstack/react-query'
import fetchImages from "../../api/queries";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Album from '@/components/PhotoAlbum';

export default withPageAuthRequired(function Page() {

  const { data } = useQuery({ queryKey: ['images'], queryFn: fetchImages })

  return (
    <main>

      {Array.isArray(data) && data.length > 0 ? <Album photos={data} /> : null}
    </main>
  )
})
