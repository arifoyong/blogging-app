import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const extractQuery = url.searchParams.get('query')

  
    const searchPostList = await prismadb.post.findMany({
      where: {
        OR : [
          {
            title: {
              contains: extractQuery || ''
            }
          },
          {
            description: {
              contains: extractQuery || ''
            }
          }
        ]
      }
    })

    if (searchPostList && searchPostList.length) {
      return NextResponse.json({
        success: true, 
        data: searchPostList,
      })
    }

    return NextResponse.json({
      success: false,
      message: "No results were found"
    })
  } catch(e) {
    console.log(e)
    return NextResponse.json({
      success: false,
      message: "Something went wrong."
    })
  }
}