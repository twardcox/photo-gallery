const fetchImages = () => {
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/get?action=getall')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Failed to fetch images:', response);
        throw new Error('Failed to fetch images');
      }
    })
    .then((images) => {
      images.forEach((image) => {
        image.original = `https://s3.amazonaws.com/${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/${image.key}`;
        image.thumbnail = `https://s3.amazonaws.com/${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/${image.key}`;
      });

      return images;
    })
    .then((images) => {
      images.forEach(async (image) => {
        const metadata = await fetchMetadata(image).then((res) => res);
        image.metadata = metadata.Metadata;
      });

      return images;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

const fetchMetadata = async (image) => {
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
