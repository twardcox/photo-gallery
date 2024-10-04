import { Photo } from '@/types/photoTypes';

const fetchImages: () => any = () => {
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/get?action=getall')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Failed to fetch images:', response);
        throw new Error('Failed to fetch images');
      }
    })
    .then((images: Photo[]) => {
      const promises = images.map((image: Photo) => {
        return new Promise<Photo>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            image.src = `https://s3.amazonaws.com/${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/${image.key}`;
            let width = img.width;
            let height = img.height;

            if (width > 350) {
              const aspectRatio = height / width;
              width = 350;
              height = width * aspectRatio;
            }

            image.width = width;
            image.height = height;
            resolve(image);
          };
          img.onerror = (err) => {
            console.error('Failed to load image:', err);
            reject(err);
          };
          img.src = `https://s3.amazonaws.com/${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/${image.key}`;
        });
      });

      return Promise.all(promises);
    })
    .then((images: Photo[]) => {
      images.forEach(async (image: Photo) => {
        const metadata = await fetchMetadata(image).then((res) => res);
        image.metadata = metadata.Metadata;
      });

      return images;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

const fetchMetadata = async (image: Photo) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/api/get?action=getmetadata&key=${image.key}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch metadata');
    }
    const metadata = await response.json();
    return metadata;
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return null;
  }
};

export default fetchImages;
