'use client'

import { Blog } from "@/utils/types"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


const BlogDetailComponents = ({
  blogData
} : {
  blogData: Blog
}) => {
  const [comment, setComment] = useState<string>('')
  const [mounted, setIsmounted] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    setIsmounted(true)
  },[])

  const handleComment = async () => {
    let newComments = [...blogData.comments]

    newComments.push(`${comment}|${session?.user?.name}`)
    const res = await fetch(`/api/blog-post/update-post`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: blogData.id,
        comments: newComments
      })
    })

    const data = await res.json()
    if (data && data.success) {
      setComment('')
      router.refresh()
    }

  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setComment(e.target.value)
  }

  if (!mounted) return null

  if (!blogData ) return null

  const { id, imageUrl, title, category, description, userImage, userId, comments } = blogData
  return (
    <section className="pt-[150px] pb[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-col gap-4 items-center justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <div>
              <h2 className="mb-8 text-3xl font-bold leading-tight">
                {title}
              </h2>

              {/* Author & Category */}
              <div className="p-4 flex flex-wrap items-center justify-between border-b border-2 border-opacity-10 pb-4">
                {/* User Image & User Name */}
                <div className="flex flex-wrap items-center">
                  <div className="mr-10 mb-5 flex items-center">
                    <div className="mr-4">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image 
                          fill={true}
                          sizes="(max-width: 100px)"
                          alt="Author"
                          src={userImage}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <h4 className="mb-1 text-base font-medium text-body-color">
                        By
                        <span className="pl-2">{userId.split("_")[0].toUpperCase()}</span>
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="mb-5 inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold text-foreground">
                  {category}
                </div>
              </div>

              <div className="mb-10 w-full overflow-hidden rounded">
                <div className="relative w-full aspect-[97/60]">
                  <Image 
                    src={imageUrl || ''}
                    alt={title}
                    className="object-cover object-center"
                    fill={true}
                    priority
                    sizes="(max-width: 1024px) 100vw"
                  />
                </div>                
              </div>

              {/* Description */}
              <p className="mb-8 leading-relaxed text-base font-medium">
                {description}
              </p>
            </div>
          </div>

          {/* Comments */}
          { session !== null && (
            <div className="w-full lg:w-8/12 flex gap-4">
              <Input
                type='text'
                name="comment"
                id="comment"
                autoComplete="off"
                placeholder="Write coment here..."
                value={comment}
                onChange={handleCommentChange}
              />
              <Button 
                disabled={comment === '' ? true : false}
                onClick={() => handleComment()}>
                Add
              </Button>
            </div>
            )
          }

          <div className="py-8 lg:py-16 w-full lg:w-8/12">
            <div className="flex justify-betwen items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold">Discussion: {comments.length}</h2>
            </div>
            <div className="flex flex-col gap-4">
            { comments && comments.length > 0 
            ? comments.map((comment,i) => ( 
              <div key={i} className="p-6 rounded-lg border-l-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm font-semibold">
                      { comment.split('|')[1].split("_")[0] }
                    </p>
                  </div>
                </div>
                <p className="">
                  { comment.split("|")[0] }
                </p>
              </div>
            )) 
            : null }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogDetailComponents