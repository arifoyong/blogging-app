import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const blogId = url.searchParams.get('id')

    const blogDetail = await prismadb.post.findUnique({
      where: {
        id: Number(blogId)
      }
    })
    
    if (blogDetail) {
      return NextResponse.json({
        success: true,
        data: blogDetail
      })
    }

    return NextResponse.json({
      success: false,
      message: "Failed to fetch blog detail"
    })
  } catch(e) {
    console.log(e)
    return NextResponse.json({
      success: false,
      message: "Something went wrong."
    })
  }
}