import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { studentCode: string } },
) {
  try {
    const user = await db.student.findMany({
      where: {
        studentCode: params.studentCode,
      },
      select: {
        studentCode: true,
        account: {
          select: {
            name: true,
            image: true,
          },
        },
        school: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!user) {
      return NextResponse.json("Không lấy được dữ liệu của student");
    }
    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json({ e: "Lỗi lấy user" }, { status: 500 });
  }
}
