'use client'

import { Blog } from "@/utils/types"
import BlogSingle from "../blog-single"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const BlogList = ({ 
  lists
} : {
  lists: Blog[]
}) => {
  const router = useRouter()
  useEffect(() => {
    router.refresh()  
  },[])

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/blog-post/delete-post?id=${id}`, {
      method: 'DELETE',
      cache: 'no-store'
    })

    const data =  await res.json()
    if (data && data.success) {
      router.refresh()
    }
  }

  return (
    <section className="pt-[120px] pb-[120px]">
      <div className="container">
        <div className=" -mx-4 grid md:grid-cols-3 gap-6">
          { 
            lists && lists.length ? 
            lists.map((listItem: Blog) => (
              <div className="flex px-4 w-auto" key={listItem.id}>
                <BlogSingle 
                  handleDelete={handleDelete}
                  blogItem={listItem}/>
              </div>
            ))
            : null
        }
        </div>
      </div>
    </section>
  )
}

export default BlogList