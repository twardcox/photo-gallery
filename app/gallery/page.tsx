'use client'

import ImageGallery from "react-image-gallery";
import { useQuery } from '@tanstack/react-query'
import fetchImages from "../api/queries";

const Page = () => {

  const { data } = useQuery({ queryKey: ['images'], queryFn: fetchImages })

  return (
    <main>
      {data && <ImageGallery items={data} />}
    </main>
  )
}

export default Page;
