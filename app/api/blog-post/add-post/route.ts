import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb"


export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    
    if (!data.userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }


    const newPost = await prismadb.post.create({
      data
    })

    if (newPost) {
      return NextResponse.json({
        success: true,
        message: "New blog post created"
      })
    }

    return NextResponse.json({
      success: false,
      message: "Something went wrong."
    })
  } catch(e) {
    console.log(e)
    return NextResponse.json({
      success: false,
      message: "Something went wrong."
    })
  }
}