import { Blog } from "@/utils/types"
import { Trash2 } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

const BlogSingle = ({
  blogItem,
  handleDelete
} : {
  blogItem: Blog,
  handleDelete: (id: number) => void
}) => {
  const { id, imageUrl, title, category, description, userImage, userId } = blogItem
  const { data: session } = useSession()

  return (
    <div className="relative w-full overflow-hidden rounded-md shadow-one border-2 border-secondary dark:border-2 dark:border-2">
      <Link href={`/blogs/${id}`}>
        <span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold capitalize text-white">
          {category}
        </span>
        <div className="relative w-full aspect-[97/60]">
          <Image             
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{objectFit: "fill"}}
            priority
            quality={80}
            src={imageUrl}
            alt={title}
          />
        </div>
      </Link>
      <div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
          <Link 
            href={`/blogs/${id}`}
            className="mb-4 text-ellipsis overflow-hidden whitespace-nowrap block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
          >
            {title}
          </Link>
        <p className="h-32 mb-6 pb-6 font-medium  ">
          {description.length > 100 ? `${description.substring(0,100)}...` : description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
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
            <div className="flex flex-col">
              <div className="mb-1 text-sm font-medium text-dark dark:text-white">
                By
              </div>
              <div className="mb-1 text-sm font-medium text-dark dark:text-white">
                {userId.split("_")[0].toUpperCase()}
              </div>
            </div>
          </div>
            {
              session !== null && session?.user?.name === userId 
              ? ( <Trash2 className="w-6 h-6 cursor-pointer" onClick={() => handleDelete(id)}/> ) 
              : null
            }
        </div>
      </div>
    </div>
  )
}

export default BlogSingle