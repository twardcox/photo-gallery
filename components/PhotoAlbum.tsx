'use client'

import { PhotoAlbumProps, RenderImageContextProps } from "@/types/photoTypes";
import { FC } from "react";
import PhotoAlbum, { RenderImageProps } from "react-photo-album";
import "react-photo-album/styles.css";
import Image from "next/image";


const Album: FC<PhotoAlbumProps> = ({ photos, albumView, viewMetadata, columns }) => {

  const renderMetadata = (metadata: any) => {
    return Object.keys(metadata).map((key) => {
      return <p className="photo-data" key={key}>{key}: {metadata[key]}</p>
    })
  }

  const renderNextImage = (
    { alt = "", title, sizes }: RenderImageProps,
    { photo, width, height }: RenderImageContextProps,
  ) => {
    return (
      <div className="photo">
        <div
          style={{
            width: "100%",
            position: "relative",
            aspectRatio: `${width} / ${height}`,
          }}
        >
          <Image
            fill
            src={photo}
            alt={alt}
            title={title}
            sizes={sizes}
            placeholder={"blurDataURL" in photo ? "blur" : undefined}
          />
        </div>
        {
          viewMetadata &&
          photo.metadata && renderMetadata(photo.metadata)
        }
      </div>
    );
  }

  return (
    <>
      <PhotoAlbum
        layout={albumView}
        photos={photos}
        render={{ image: renderNextImage }}
        padding={2}
        columns={(containerWidth) => {
          if (columns > 0) return columns;
          if (containerWidth < 400) return 1;
          if (containerWidth < 600) return 2;
          if (containerWidth < 900) return 3;
          return 4;
        }}
      />
    </>
  );
}

export default Album;
