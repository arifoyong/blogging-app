import BlogDetailComponents from "@/components/blog-details"

interface Param {
  id: string
}

async function getBlogDetails(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog-post/blog-detail?id=${id}`, {
    method: 'GET',
    cache: 'no-store'
  })
  
  const data = await res.json()
  if (data.success) return data.data
}

const BlogDetail = async ({
  params
} : {
  params: Param
}) => {
  const { id } = params
  const blogData = await getBlogDetails(id)

  return <BlogDetailComponents blogData={blogData}/>
}

export default BlogDetail