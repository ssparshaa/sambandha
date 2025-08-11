import { NextResponse } from "next/server";
import { DemoResponse } from "../../lib/types";

export async function GET() {
  const response: DemoResponse = {
    message: "Hello from Next.js API",
  };

  return NextResponse.json(response);
}
