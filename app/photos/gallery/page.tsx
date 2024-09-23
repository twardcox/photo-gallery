'use client'

import ImageGallery from "react-image-gallery";
import { useQuery } from '@tanstack/react-query'
import fetchImages from "../../api/queries";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function Page() {
  const { data } = useQuery({ queryKey: ['images'], queryFn: fetchImages })

  return (
    <main>
      {data && <ImageGallery items={data} />}
    </main>
  )
})
