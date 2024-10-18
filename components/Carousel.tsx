import React, { Dispatch, SetStateAction, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/scss/alice-carousel.scss';

const thumbItems = (
  items: any[],
  [setThumbIndex, setThumbAnimation]: [
    Dispatch<SetStateAction<number>>,
    Dispatch<SetStateAction<boolean>>,
  ],
) => {
  return items.map((item, i) => {

    return <div
      key={i}
      className="thumb"
      role="button"
      tabIndex={0}
      onClick={() => { setThumbIndex(i); setThumbAnimation(true); }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setThumbIndex(i);
          setThumbAnimation(true);
        }
      }}
    >
      {item}
    </div>
  });
};

interface CarouselProps {
  items: any[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [mainIndex, setMainIndex] = useState(0);
  const [mainAnimation, setMainAnimation] = useState(false);
  const [thumbIndex, setThumbIndex] = useState(0);
  const [thumbAnimation, setThumbAnimation] = useState(false);
  const [thumbs] = useState(thumbItems(items, [setThumbIndex, setThumbAnimation]));

  const slideNext = () => {
    if (!thumbAnimation && thumbIndex < thumbs.length - 1) {
      setThumbAnimation(true);
      setThumbIndex(thumbIndex + 1);
    }
  };

  const slidePrev = () => {
    if (!thumbAnimation && thumbIndex > 0) {
      setThumbAnimation(true);
      setThumbIndex(thumbIndex - 1);
    }
  };

  const syncMainBeforeChange = () => {
    setMainAnimation(true);
  };

  const syncMainAfterChange = (e: any) => {
    setMainAnimation(false);

    if (e.type === 'action') {
      setThumbIndex(e.item);
      setThumbAnimation(false);
    } else {
      setMainIndex(thumbIndex);
    }
  };

  const syncThumbs = (e: any) => {
    setThumbIndex(e.item);
    setThumbAnimation(false);

    if (!mainAnimation) {
      setMainIndex(e.item);
    }
  };

  const handleOnKeyDown = (e: any, direction: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      direction === 'prev' ? slidePrev() : slideNext();
    }
  }


  return (
    <>
      <AliceCarousel
        activeIndex={mainIndex}
        animationType="fadeout"
        animationDuration={400}
        disableDotsControls
        disableButtonsControls
        items={items}
        innerWidth={200}
        mouseTracking={!thumbAnimation}
        onSlideChange={syncMainBeforeChange}
        keyboardNavigation
        onSlideChanged={syncMainAfterChange}
        touchTracking={!thumbAnimation}
      />
      <div className="thumbs">
        <AliceCarousel
          activeIndex={thumbIndex}
          autoWidth
          disableDotsControls
          disableButtonsControls
          items={thumbs}
          mouseTracking={false}
          onSlideChanged={syncThumbs}
          touchTracking={!mainAnimation}
        />
        <div
          className="btn-prev"
          role="button"
          tabIndex={0}
          onClick={slidePrev}
          onKeyDown={(e) => handleOnKeyDown(e, 'prev')}
        >
          &lang;
        </div>
        <div
          className="btn-next"
          role="button"
          tabIndex={0}
          onClick={slideNext}
          onKeyDown={(e) => handleOnKeyDown(e, 'next')}
        >
          &rang;
        </div>
      </div>
    </>
  );
};

export default Carousel;
