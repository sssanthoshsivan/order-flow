import { NextResponse } from "next/server";
import cartData from "@/data/cart.json";

export async function GET() {
  // Simulate a slight network delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return NextResponse.json(cartData);
}
