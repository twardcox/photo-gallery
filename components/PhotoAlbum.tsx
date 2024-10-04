'use client'

import { PhotoAlbumProps, RenderImageContextProps } from "@/types/photoTypes";
import AlbumOptions from "./AlbumOptions";
import { FC, useState } from "react";
import PhotoAlbum, { RenderImageProps } from "react-photo-album";
import "react-photo-album/styles.css";
import Image from "next/image";

const Album: FC<PhotoAlbumProps> = ({ photos }) => {
  const [viewOptions, setViewOptions] = useState<'pane' | 'carousel'>('pane');
  const [albumView, setAlbumView] = useState<'columns' | 'rows' | 'masonry'>('rows');
  const [viewMetadata, setViewMetadata] = useState(false);

  const renderMetadata = (metadata: any) => {
    return Object.keys(metadata).map((key) => {
      return <p key={key}>{key}: {metadata[key]}</p>
    })
  }

  function renderNextImage(
    { alt = "", title, sizes }: RenderImageProps,
    { photo, width, height }: RenderImageContextProps,
  ) {
    console.log('photo: ', photo);
    return (
      <div
        style={{
          width: "100%",
          position: "relative",
          aspectRatio: `${width} / ${height}`,
        }}
      >
        <Image
          className="photo"
          fill
          src={photo}
          alt={alt}
          title={title}
          sizes={sizes}
          placeholder={"blurDataURL" in photo ? "blur" : undefined}
        />
        {
          viewMetadata &&
          <div className="photo-data">
            {photo.metadata && renderMetadata(photo.metadata)}
          </div>
        }
      </div>
    );
  }

  const handleMetadataView = () => {
    setViewMetadata(!viewMetadata);
  }

  const handleAlbumView = (view: 'columns' | 'rows' | 'masonry') => {

    setAlbumView(view);
  }


  return (
    <div className="album-wrapper">
      <div className="options">
        <AlbumOptions metadataView={handleMetadataView} albumView={handleAlbumView} />
      </div>
      {/* <div className="album">
        {photos.map(photo => {

          const divStyle = {
            height: `${photo.height}px`,
            // width: `${photo.width}px`,
          };
          return (
            <div key={photo.key} style={divStyle}>
              <Image
                className="photo"
                key={photo.key}
                src={photo.src || '/default-image.jpg'}
                alt={photo.key}
                style={{ objectFit: "contain" }}
                loading="lazy"
                height={photo.height}
                width={photo.width}
              />
              {
                viewMetadata &&
                <div className="photo-data">
                  {photo.metadata && renderMetadata(photo.metadata)}
                </div>
              }
            </div>)
        })}
      </div> */}
      <PhotoAlbum
        layout={albumView}
        photos={photos}
        render={{ image: renderNextImage }}
        padding={2}
      />
    </div>
  );
}

export default Album;
