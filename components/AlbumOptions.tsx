'use client'

import { ChangeEvent } from "react";

type AlbumOptionsProps = {
  metadataView: () => void;
  handleAlbumView: (view: 'columns' | 'rows' | 'masonry') => void;
  handleImageView: (view: 'frames' | 'carousel') => void;
  viewOptions: 'frames' | 'carousel';
  columns: number;
  handleColumnsChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  albumView: 'columns' | 'rows' | 'masonry';
}


const AlbumOptions = ({
  metadataView,
  handleAlbumView,
  handleImageView,
  viewOptions,
  columns,
  handleColumnsChange,
  albumView
}: AlbumOptionsProps) => {

  const renderOptions = (num: number) => {
    return (
      <option key={num} value={num}>
        {num === 0 ? 'Auto' : `${num} Column${num > 1 ? 's' : ''}`}
      </option>
    );
  }

  return (
    <>
      {
        viewOptions === 'frames' && albumView === 'columns' &&
        <div className="select-columns">
          <select
            value={columns}
            onChange={handleColumnsChange}
            title="Select number of columns"
            className="column-selector"
          >
            {[0, 1, 2, 3, 4, 5].map((num) => (
              renderOptions(num)
            ))}
          </select>
        </div>
      }
      <div className="album-options">
        <button title="View Metadata" onClick={metadataView}>
          <i className="material-icons">
            description
          </i>
        </button>
        <button title="Carousel View" onClick={() => handleImageView('carousel')}>
          <i className="material-icons">
            view_carousel
          </i>
        </button>
        <button title="Frames View" onClick={() => handleImageView('frames')}>
          <i className="material-icons">
            photo_library
          </i>
        </button>
        {
          viewOptions === 'frames' &&
          (
            <>
              <button title="Columns View" onClick={() => handleAlbumView('columns')}>
                <i className="material-icons">
                  view_column
                </i>
              </button>
              <button title="Rows View" onClick={() => handleAlbumView('rows')}>
                <i className="material-icons">
                  view_stream
                </i>
              </button>
              <button title="Masonry View" onClick={() => handleAlbumView('masonry')}>
                <i className="material-icons">
                  view_module
                </i>
              </button>


            </>
          )
        }
      </div>
    </>
  );
}

export default AlbumOptions;
