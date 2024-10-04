import {
  S3Client,
  HeadObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const action = url.searchParams.get('action');
  const key = url.searchParams.get('key');

  if (action === 'getall') {
    return await getAllImages();
  } else if (action === 'presignedurl') {
    const filename = url.searchParams.get('filename');
    const contentType = url.searchParams.get('contentType');
    return await getPresignedUrl(filename, contentType);
  } else if (action === 'getmetadata' && key) {
    return await getMetadata(key);
  } else {
    return new Response('Invalid action', { status: 400 });
  }
}

async function getAllImages() {
  try {
    const client = new S3Client({ region: process.env.AWS_REGION });
    const command = new ListObjectsV2Command({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    });
    const data = await client.send(command);
    console.log('route data: ', data);
    // src: assetLink(asset, breakpoint),
    // width: breakpoint,
    // height: Math.round((height / width) * breakpoint),
    const images =
      data.Contents?.map((item) => ({
        key: item.Key,
        lastModified: item.LastModified,
        size: item.Size,
      })) || [];

    return new Response(JSON.stringify(images), { status: 200 });
  } catch (error) {
    return new Response('Error listing images', { status: 500 });
  }
}

async function getPresignedUrl(
  filename: string | null,
  contentType: string | null
) {
  if (!filename || !contentType) {
    return new Response('Missing filename or contentType', { status: 400 });
  }

  try {
    const client = new S3Client({ region: process.env.AWS_REGION });
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: uuidv4(),
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10 MB
        ['eq', '$Content-Type', contentType],
      ],
    });

    return new Response(JSON.stringify({ url, fields }), { status: 200 });
  } catch (error) {
    return new Response('Error generating presigned URL', { status: 500 });
  }
}

async function getMetadata(key: string) {
  try {
    const client = new S3Client({ region: process.env.AWS_REGION });
    const command = new HeadObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: key,
    });
    const metadata = await client.send(command);

    return new Response(JSON.stringify(metadata), { status: 200 });
  } catch (error) {
    return new Response('Error retrieving metadata', { status: 500 });
  }
}
