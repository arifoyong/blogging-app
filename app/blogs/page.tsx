import BlogList from "@/components/blog-list"

async function extractAllBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog-post/get-all-posts`,{
    method: 'GET',
    cache: 'no-store'
  })

  const data = await res.json()
  if (data.success) return data.data
}

export default async function Blogs() {
  const allPosts = await extractAllBlogs()
  return <BlogList lists={allPosts} />
}