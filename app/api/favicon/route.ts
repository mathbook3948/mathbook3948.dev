import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const appFavicon = await prisma.config.findFirst({
    where: {
      key: "APP_FAVICON",
    },
  });

  const binary = Buffer.from(appFavicon!.value, "base64");

  return new NextResponse(binary, {
    headers: {
      "Content-Type": "image/png",
      "Content-Length": binary.length.toString(),
    },
  });
}
