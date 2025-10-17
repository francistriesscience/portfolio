import Image from "next/image"

export default function OGPreview() {
  const slug = "dont-reinvent-the-wheel-stand-on-the-shoulders-of-giants"

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">OG Image Preview</h1>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">Current OG Image:</h2>
          <div className="overflow-hidden rounded-lg border bg-gray-100">
            <Image
              src={`/api/notebooks/${slug}/og`}
              alt="OG Image Preview"
              width={1200}
              height={630}
              className="h-auto w-full"
              unoptimized
            />
          </div>

          <div className="mt-6 rounded-lg bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-blue-900">Preview URL:</h3>
            <code className="text-blue-800">http://localhost:3001/api/notebooks/{slug}/og</code>
          </div>

          <div className="mt-4 rounded-lg bg-green-50 p-4">
            <h3 className="mb-2 font-semibold text-green-900">Direct Browser Access:</h3>
            <p className="text-green-800">Open this URL in your browser to see the raw image:</p>
            <a
              href={`http://localhost:3001/api/notebooks/${slug}/og`}
              target="_blank"
              className="text-green-600 underline hover:text-green-800"
            >
              http://localhost:3001/api/notebooks/{slug}/og
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
