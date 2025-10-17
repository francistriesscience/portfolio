import { ImageResponse } from "@vercel/og"
import { getPostBySlug } from "@/lib/notebooks/get-post-by-slug"
import { NextRequest } from "next/server"

export const runtime = "nodejs"

/* eslint-disable @next/next/no-img-element */

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  const georgiaRegular = await fetch(new URL("/fonts/georgia/georgia.ttf", request.url)).then(
    (res) => res.arrayBuffer(),
  )
  const georgiaBold = await fetch(new URL("/fonts/georgia/georgia-bold.ttf", request.url)).then(
    (res) => res.arrayBuffer(),
  )
  const writerRegular = await fetch(new URL("/fonts/writer/writer-regular.ttf", request.url)).then(
    (res) => res.arrayBuffer(),
  )

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
            fontFamily: "Georgia, serif",
          }}
        >
          Post Not Found
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "60px",
          color: "black",
          fontFamily: "Writer, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            width: "100%",
          }}
        >
          {post.tags.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "#f3f4f6",
                    color: "#374151",
                    padding: "4px 12px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    fontWeight: "500",
                    textTransform: "uppercase",
                    fontFamily: "Writer, sans-serif",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "400",
              lineHeight: "1.2",
              margin: 0,
              color: "#111827",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              fontFamily: "Georgia, serif",
            }}
          >
            {post.title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "20px",
              lineHeight: "1.4",
              margin: 0,
              color: "#6b7280",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              fontFamily: "Writer, sans-serif",
            }}
          >
            {post.description}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "12px",
            width: "100%",
          }}
        >
          {/* Authors */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {post.authors.map((author, index) => (
              <div
                key={author.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {index > 0 && (
                  <span
                    style={{ color: "#6b7280", fontSize: "18px", fontFamily: "Writer, sans-serif" }}
                  >
                    ,
                  </span>
                )}
                {author.imageUrl && (
                  <img
                    src={author.imageUrl}
                    alt={author.name}
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                )}
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "#111827",
                    fontFamily: "Writer, sans-serif",
                  }}
                >
                  {author.name}
                </span>
              </div>
            ))}
          </div>

          {/* Date and Reading Time */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "16px",
              color: "#6b7280",
              fontFamily: "Writer, sans-serif",
            }}
          >
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Georgia",
          data: georgiaRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Georgia",
          data: georgiaBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "Writer",
          data: writerRegular,
          style: "normal",
          weight: 400,
        },
      ],
    },
  )
}
