import { CartData } from "@/types";
import CartView from "@/components/CartView";
import cartData from "@/data/cart.json";

function getCartData(): CartData {
  // Import cart data directly — works reliably in Server Components
  // both locally and on Vercel (no running server needed at build time)
  return cartData as CartData;
}

export default function CartPage() {
  const data = getCartData();

  return (
    <CartView
      cartItems={data.cartItems}
      shippingFee={data.shipping_fee}
      discount={data.discount_applied}
    />
  );
}
