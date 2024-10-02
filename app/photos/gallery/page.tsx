'use client'

import { useQuery } from '@tanstack/react-query'
import fetchImages from "../../api/queries";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { RowsPhotoAlbum } from "react-photo-album";

export default withPageAuthRequired(function Page() {
  const { data } = useQuery({ queryKey: ['images'], queryFn: fetchImages })

  return (
    <main>

      {data && <RowsPhotoAlbum photos={data} />}
    </main>
  )
})
