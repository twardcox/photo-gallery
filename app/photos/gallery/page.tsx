'use client'

import { useQuery } from '@tanstack/react-query'
import fetchImages from "../../api/queries";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Album from '@/components/PhotoAlbum';
import classnames from "classnames";
import { ChangeEvent, useState } from 'react';
import AlbumOptions from '@/components/AlbumOptions';
import Carousel from '@/components/Carousel';
import { PhotoProps } from '@/types/photoTypes';
import Image from "next/image";

export default withPageAuthRequired(function Page() {
  const [viewOptions, setViewOptions] = useState<'frames' | 'carousel'>('carousel');
  const [albumView, setAlbumView] = useState<'columns' | 'rows' | 'masonry'>('rows');
  const [viewMetadata, setViewMetadata] = useState(false);
  const [columns, setColumns] = useState<number>(0);

  const { data } = useQuery({ queryKey: ['images'], queryFn: fetchImages })

  const handleMetadataView = () => {
    setViewMetadata(!viewMetadata);
  }

  const handleAlbumView = (view: 'columns' | 'rows' | 'masonry') => {
    setAlbumView(view);
  }

  const handleImageView = (view: 'frames' | 'carousel') => {
    setViewOptions(view);
  }

  const handleColumnsChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newColumns = parseInt(event.target.value, 10);
    setColumns(newColumns);
  };

  const renderImagesForCarousel = (data: any[]) => {
    return data.map((photo: PhotoProps, index: number) => {
      return (
        <div key={photo.key} className="carousel-item" data-value={index}>
          <Image
            src={photo.src}
            alt={'photo.alt'}
            title={'photo.title'}
            height={photo.height}
            width={photo.width}
          />
        </div>
      )
    })
  }

  const renderImageSet = (data: any[]) => {
    if (viewOptions === 'frames') {
      return (
        <div className="frames">
          <Album
            layout={albumView}
            photos={data}
            viewMetadata={viewMetadata}
            columns={columns}
            albumView={albumView}
          />
        </div>
      )
    }

    return (
      <div className="carousel">
        <Carousel items={renderImagesForCarousel(data)} />
      </div>
    )
  }

  return (
    <main>
      <div className={classnames("options", { hasColumns: viewOptions === 'frames' && albumView === 'columns' })}>
        <AlbumOptions
          metadataView={handleMetadataView}
          handleAlbumView={handleAlbumView}
          handleImageView={handleImageView}
          viewOptions={viewOptions}
          columns={columns}
          handleColumnsChange={handleColumnsChange}
          albumView={albumView}
        />
      </div>
      {
        Array.isArray(data) && data.length > 0
          ?
          renderImageSet(data)
          :
          null
      }
    </main>
  )
})
