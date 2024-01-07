import prismadb from "@/lib/prismadb";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json()
    const updateBlog = await prismadb.post.update({
      where: {
        id: Number(data.id)
      },
      data: {
        comments: data.comments
      }
    })

    if (updateBlog) {
      return NextResponse.json({
        success: true,
        message: 'Blog post updated.'
      })
    }

    return NextResponse.json({
      success: false,
      message: "Failed to update blog post."
    })
  } catch(e) {
    console.log(e)
    return NextResponse.json({
      success: false,
      message: "Something went wrong."
    })
  }
}