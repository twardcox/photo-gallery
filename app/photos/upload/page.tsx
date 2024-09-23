'use client'

import { useState } from 'react'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import ImageGallery from "react-image-gallery";

export default withPageAuthRequired(function Page() {
  const [files, setFiles] = useState<FileList | null>(null)
  const [uploading, setUploading] = useState(false)
  const [showFiles, setShowFiles] = useState(null)
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!files) {
      alert('Please select a file to upload.')
      return
    }
    // start mapping here
    Array.from(files).forEach(async (file) => {

      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        alert('Please select a PNG or JPEG file.')
        return
      }

      setUploading(true)
      const filename = `${file.name.replace(' ', '_')}${file.lastModified}}`
      const metaData = { 'x-amz-meta-name': user.name }
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + '/api/upload',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filename: filename, contentType: file.type, metaData: metaData }),
        }
      )

      if (response.ok) {
        const { url, fields } = await response.json()

        const formData = new FormData()

        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value as string)
        })

        formData.append('file', file)

        const uploadResponse = await fetch(url, {
          method: 'POST',
          body: formData,
        })

        if (uploadResponse.ok) {
          alert('Upload successful!')
        } else {
          console.error('S3 Upload Error:', uploadResponse)
          alert('Upload failed.')
        }
      } else {
        alert('Failed to get pre-signed URL.')
      }
    })
    setFiles(null)
    setShowFiles(null)
    setUploading(false)
  }

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowFiles(true)
    const files = e.target.files
    if (files) {
      setFiles(files)
      const filesToShow = Array.from(files).map((file) => {
        const image = {
          ...file,
          original: URL.createObjectURL(file),
          thumbnail: URL.createObjectURL(file),
        };
        return image;
      });
      setShowFiles(filesToShow);
    }
  };

  return (
    <main>
      <h1>Upload a File to S3</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="file"
          type="file"
          onChange={handleSelectFiles}
          accept="image/png, image/jpeg"
          multiple={true}
        />
        <button type="submit" disabled={uploading}>
          Upload
        </button>
      </form>
      <section>
        {showFiles && <ImageGallery items={showFiles} />}
      </section>
    </main>
  )
})
