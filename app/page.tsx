import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <section className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[800px] text-center">
              <h1 className="mb-5 text-3xl font-bold leading-tight">
                Welcome to my blog
              </h1>
              <p className="mb-12 font-medium !leading-relaxed">
                This is my where I write about my current thoughts. Feel free to comment & chip-in
              </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link href='/blogs'>
                  <Button size="lg">
                    Explore all blogs
                  </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
