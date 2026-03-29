import { NextResponse } from "next/server";
import { servicesRepo } from "@/src/lib/repositories/servicesRepo";

export async function GET() {
  const services = await servicesRepo.list();
  return NextResponse.json({ services });
}
