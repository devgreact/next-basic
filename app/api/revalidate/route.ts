import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const tag = req.nextUrl.searchParams.get("tag");
    if(!tag) throw Error("태그는 필수 입니다.")
    revalidateTag(tag);
    return NextResponse.json({message: "재검을 성공했습니다.", tag})
}