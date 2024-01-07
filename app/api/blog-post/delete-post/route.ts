import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const deleteId = url.searchParams.get('id')

    const deletedBlog = await prismadb.post.delete({
      where: {
        id: Number(deleteId)
      }
    })

    if (deletedBlog) {
      return NextResponse.json({
        success: true,
        message: "Delete successful"
      })
    }

    return NextResponse.json({
      success: false,
      message: "Failed to delete"
    })
  } catch(e) {
    console.log(e)
    return NextResponse.json({
      success: false,
      message: "Something went wrong."
    })
  }
}