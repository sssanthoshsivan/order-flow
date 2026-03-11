"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { CartItem } from "@/types";
import StepIndicator from "./StepIndicator";

interface CartViewProps {
  cartItems: CartItem[];
  shippingFee: number;
  discount: number;
}

export default function CartView({
  cartItems,
  shippingFee,
  discount,
}: CartViewProps) {
  const router = useRouter();
  const { setCartData } = useCheckout();

  useEffect(() => {
    setCartData(cartItems, shippingFee, discount);
  }, [cartItems, shippingFee, discount, setCartData]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const grandTotal = subtotal + shippingFee - discount;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-4 pb-12">
      <StepIndicator currentStep={1} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Product List */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Your Cart
            <span className="text-sm font-normal text-[var(--text-muted)] ml-2">
              ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
            </span>
          </h1>

          {cartItems.map((item, index) => (
            <div
              key={item.product_id}
              className={`
                bg-white rounded-[var(--radius-lg)] p-4 sm:p-5 shadow-[var(--shadow-sm)]
                border border-[var(--border)] hover:shadow-[var(--shadow-md)] transition-all duration-300
                flex gap-4 sm:gap-5 items-center animate-slide-up
              `}
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              {/* Product Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-[var(--accent-bg)] to-[#edf5e1] flex-shrink-0 overflow-hidden flex items-center justify-center">
                <div className="text-3xl">
                  {item.product_id === 101 ? "🪥" : "🛍️"}
                </div>
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[var(--text-primary)] text-sm sm:text-base leading-tight">
                  {item.product_name}
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-bg)] text-[var(--accent)] font-medium">
                    Eco-friendly
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 sm:mt-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[var(--text-muted)]">
                      Qty:
                    </span>
                    <span className="w-8 h-8 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] flex items-center justify-center text-sm font-medium">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[var(--accent)]">
                      ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-[var(--text-muted)]">
                        ₹{item.product_price.toLocaleString("en-IN")} each
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[var(--radius-lg)] p-5 sm:p-6 shadow-[var(--shadow-md)] border border-[var(--border)] sticky top-24 animate-scale-in">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Subtotal</span>
                <span className="font-medium">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Shipping</span>
                <span className="font-medium">
                  ₹{shippingFee.toLocaleString("en-IN")}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">
                    -₹{discount.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              <div className="border-t border-[var(--border)] pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="text-base font-bold text-[var(--text-primary)]">
                    Grand Total
                  </span>
                  <span className="text-xl font-bold text-[var(--accent)]">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push("/shipping")}
              className="
                w-full mt-6 py-3.5 rounded-xl font-semibold text-white text-sm
                bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)]
                hover:from-[var(--accent-light)] hover:to-[var(--accent)]
                shadow-md hover:shadow-lg
                transform hover:-translate-y-0.5 active:translate-y-0
                transition-all duration-200 cursor-pointer
              "
            >
              Proceed to Checkout →
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[var(--text-muted)]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>SSL Encrypted & Secure</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
