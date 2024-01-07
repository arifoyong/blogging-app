'use client'

import BlogList from "@/components/blog-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlobalContext } from "@/context"
import React, { useContext } from "react"

const Search = () => {
  const{searchResult, setSearchResult, searchQuery, setSearchQuery} = useContext(GlobalContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }

  const handleSearch = async () => {
    console.log(searchQuery)

    const res = await fetch(`/api/search?query=${searchQuery}`, {
      method: 'GET', 
      cache: 'no-store'
    })

    const data = await res.json()
    if (data.success) {
      setSearchQuery('')
      setSearchResult(data.data)
    } else {
      setSearchQuery('')
      setSearchResult([])
    }
  }

  return (
    <section className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mb-12 rounded-md bg-primary/[3%] py-11 px-8 sm:p-[50px] lg:mb-5 lg:px-8 xl:p-[55px]">
              <h2 className="mb-3 text-2xl font-bold text-black">
                Search any blog post
              </h2>

              <div className="flex flex-col gap-4">
                <div className="flex gap-4 ">
                  <Input 
                    type='text'
                    name='search'
                    id='search'
                    autoComplete="off"
                    autoFocus
                    placeholder="search blog . . ."
                    value={searchQuery}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Button onClick={() => handleSearch()}>
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Search Result */}
          { searchResult && searchResult.length 
          ? (
            <BlogList lists={searchResult} />
          ) 
          : (
            <h1 className="container">No result was found</h1>
          )}

        </div>
      </div>
    </section>
  )
}

export default Search