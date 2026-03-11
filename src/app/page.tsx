import { CartData } from "@/types";
import CartView from "@/components/CartView";

async function getCartData(): Promise<CartData> {
  // Fetch from the local API route during SSR
  // In production, this would be an external API
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/cart`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch cart data");
  }

  return res.json();
}

export default async function CartPage() {
  const data = await getCartData();

  return (
    <CartView
      cartItems={data.cartItems}
      shippingFee={data.shipping_fee}
      discount={data.discount_applied}
    />
  );
}
