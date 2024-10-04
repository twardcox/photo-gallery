export interface PhotoAlbumProps {
  photos: PhotoProps[];
  layout: 'columns' | 'rows' | 'masonry';
  viewMetadata: boolean;
  columns: number;
  albumView: 'columns' | 'rows' | 'masonry';
}

export interface PhotoProps {
  key: string;
  src: string;
  width: number;
  height: number;
  metadata?: Record<string, any>; // Add the metadata property
}

export interface AlbumOptionsProps {
  metadataView: () => void;
  albumView: (view: 'columns' | 'rows' | 'masonry') => void;
}

export interface RenderImageContextProps {
  photo: PhotoProps;
  width: number;
  height: number;
}
