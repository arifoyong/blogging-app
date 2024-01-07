import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const allBlogs = await prismadb.post.findMany()
    if (allBlogs && allBlogs.length) {
      return NextResponse.json({
        success: true, 
        data: allBlogs,
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