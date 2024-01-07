'use client'

import * as z from 'zod'
import { useState, useEffect, useContext } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { redirect, useRouter } from 'next/navigation'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ImageUpload from '@/components/image-upload'
import { useSession } from 'next-auth/react'

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  imageUrl: z.string().min(1)
})

type BlogFormValues = z.infer<typeof formSchema>

export default function Create() {
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      imageUrl: ''
    }
  })

  useEffect(() => {
    setIsMounted(true)
  },[])

  const onSubmit = async (values: BlogFormValues) => {
    try {
      await fetch('/api/blog-post/add-post', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          userId: session?.user?.name,
          userImage: session?.user?.image,
          comments: [],
        })
      })

      router.push("/blogs")
    } catch(error) {
      console.log(error)
    } finally {
      // set loading false
    }
  }

  if (!isMounted) {
    return null;
  }

  return (
    <section className="container overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4">
          <div className="mb-12 rounded-md bg-secondary py-10 px-8 sm:p-[55px] lg:mb-5">
            <h2 className="mb-3 text-2xl font-bold text-primary sm:text-3xl lg:text-2xl">
              Create your own blog post
            </h2>

            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"      
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <FormField 
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem className='lg:col-span-2'>
                        <FormLabel>Upload blog image</FormLabel>
                        <FormControl>
                          <ImageUpload 
                            value={field.value ? [field.value] : []}
                            // disabled={loading}
                            onChange={(url) => field.onChange(url)}
                            onRemove={() => field.onChange("")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className='lg:col-span-2'>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input  placeholder="My awesome blog" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className='lg:col-span-3'>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea  
                            placeholder="This is a post about my awesome experience . . ." 
                            {...field} 
                            rows={8}
                            />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className='lg:col-span-1'>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input  placeholder="Category" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button 
                  type='submit' 
                  className="ml-auto" >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}