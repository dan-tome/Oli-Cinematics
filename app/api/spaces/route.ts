import { NextResponse } from "next/server";
import { spacesRepo } from "@/src/lib/repositories/spacesRepo";

export async function GET() {
  const spaces = await spacesRepo.list();
  return NextResponse.json({ spaces });
}
