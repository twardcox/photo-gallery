'use client'

type AlbumOptionsProps = {
  metadataView: () => void;
  albumView: (view: 'columns' | 'rows' | 'masonry') => void;
}


const AlbumOptions = ({ metadataView, albumView }: AlbumOptionsProps) => {
  // a series of icons that represent view options

  return (
    <div className="album-options">
      <button title="View Metadata" onClick={metadataView}>
        <i className="material-icons">
          description
        </i>
      </button>
      <button title="Carousel View">
        <i className="material-icons">
          view_carousel
        </i>
      </button>
      <button title="Pane View">
        <i className="material-icons">
          photo_library
        </i>
      </button>
      <button title="Columns View" onClick={() => albumView('columns')}>
        <i className="material-icons">
          view_column
        </i>
      </button>
      <button title="Rows View" onClick={() => albumView('rows')}>
        <i className="material-icons">
          view_stream
        </i>
      </button>
      <button title="Masonry View" onClick={() => albumView('masonry')}>
        <i className="material-icons">
          view_module
        </i>
      </button>
    </div>
  );
}

export default AlbumOptions;
