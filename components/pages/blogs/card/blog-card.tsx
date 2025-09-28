import { getAllPosts } from "@/lib/mdx"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui"

export function BlogCard() {
  const posts = await getAllPosts()

  return (
    <Link
      className="group hover:border-primary w-full cursor-pointer p-3 transition-all"
      key={post.slug}
      href={`/blogs/${post.slug}`}
    >
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 space-y-1">
              <CardTitle className="group-hover:text-primary line-clamp-2 text-sm leading-tight font-medium transition-colors">
                {post.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 text-xs leading-relaxed">
                {post.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}
