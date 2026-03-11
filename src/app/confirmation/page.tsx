"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import StepIndicator from "@/components/StepIndicator";

export default function ConfirmationPage() {
  const router = useRouter();
  const {
    cartItems,
    shippingFee,
    discount,
    shippingAddress,
    orderPlaced,
    placeOrder,
  } = useCheckout();
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if data is missing
  if (cartItems.length === 0 || !shippingAddress) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-4 pb-12">
        <StepIndicator currentStep={3} />
        <div className="bg-white rounded-[var(--radius-lg)] p-8 sm:p-12 shadow-[var(--shadow-md)] border border-[var(--border)] text-center mt-4">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            Missing Information
          </h2>
          <p className="text-[var(--text-muted)] mb-6">
            Please complete the previous steps first.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] hover:shadow-lg transition-all cursor-pointer"
          >
            ← Start Over
          </button>
        </div>
      </main>
    );
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const grandTotal = subtotal + shippingFee - discount;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    placeOrder();
    setIsProcessing(false);
  };

  // Order success state
  if (orderPlaced) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-4 pb-12">
        <StepIndicator currentStep={3} />
        <div className="max-w-lg mx-auto mt-8">
          <div className="bg-white rounded-[var(--radius-lg)] p-8 sm:p-12 shadow-[var(--shadow-lg)] border border-[var(--border)] text-center animate-scale-in">
            {/* Success checkmark */}
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] flex items-center justify-center shadow-lg animate-checkmark">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              {/* Decorative dots */}
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[var(--accent-lighter)] animate-pulse-slow" />
              <div className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-[var(--accent-bg)] animate-pulse-slow" style={{ animationDelay: "0.5s" }} />
              <div className="absolute top-0 -left-4 w-2 h-2 rounded-full bg-[var(--accent-light)] animate-pulse-slow" style={{ animationDelay: "1s" }} />
            </div>

            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
              Order Successful! 🎉
            </h1>
            <p className="text-[var(--text-muted)] mb-2">
              Thank you for your eco-conscious purchase!
            </p>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              Order confirmation has been sent to{" "}
              <span className="font-medium text-[var(--accent)]">
                {shippingAddress.email}
              </span>
            </p>

            <div className="bg-[var(--accent-bg)] rounded-xl p-4 mb-6 text-left">
              <p className="text-sm font-semibold text-[var(--accent)] mb-1">
                Order Total
              </p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                ₹{grandTotal.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"} •
                Shipping to {shippingAddress.city}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-[var(--accent)] font-medium">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              <span>Your eco-impact just grew! 🌱</span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-4 pb-12">
      <StepIndicator currentStep={3} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Left: Review Details */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Review & Pay
          </h1>

          {/* Order Items */}
          <div className="bg-white rounded-[var(--radius-lg)] p-5 sm:p-6 shadow-[var(--shadow-sm)] border border-[var(--border)] animate-slide-up delay-100">
            <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Order Items
            </h2>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--accent-bg)] to-[#edf5e1] flex items-center justify-center text-xl flex-shrink-0">
                      {item.product_id === 101 ? "🪥" : "🛍️"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {item.product_name}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        Qty: {item.quantity} × ₹
                        {item.product_price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-[var(--radius-lg)] p-5 sm:p-6 shadow-[var(--shadow-sm)] border border-[var(--border)] animate-slide-up delay-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Shipping Address
              </h2>
              <button
                onClick={() => router.push("/shipping")}
                className="text-xs text-[var(--accent)] hover:underline font-medium cursor-pointer"
              >
                Edit
              </button>
            </div>
            <div className="bg-[var(--bg-primary)] rounded-xl p-4 text-sm space-y-1">
              <p className="font-semibold text-[var(--text-primary)]">
                {shippingAddress.fullName}
              </p>
              <p className="text-[var(--text-secondary)]">
                {shippingAddress.email}
              </p>
              <p className="text-[var(--text-secondary)]">
                +91 {shippingAddress.phone}
              </p>
              <p className="text-[var(--text-secondary)]">
                {shippingAddress.city}, {shippingAddress.state} -{" "}
                {shippingAddress.pinCode}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Payment Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[var(--radius-lg)] p-5 sm:p-6 shadow-[var(--shadow-md)] border border-[var(--border)] sticky top-24 animate-scale-in">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">
              Payment Summary
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
                    Total
                  </span>
                  <span className="text-xl font-bold text-[var(--accent)]">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            <button
              id="pay-button"
              onClick={handlePayment}
              disabled={isProcessing}
              className={`
                w-full mt-6 py-3.5 rounded-xl font-semibold text-white text-sm
                transition-all duration-300 cursor-pointer
                ${
                  isProcessing
                    ? "bg-[var(--text-muted)] cursor-not-allowed"
                    : "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] hover:from-[var(--accent-light)] hover:to-[var(--accent)] shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                }
              `}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  🔒 Pay Securely — ₹{grandTotal.toLocaleString("en-IN")}
                </>
              )}
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
              <span>256-bit SSL Encryption</span>
            </div>

            <button
              type="button"
              onClick={() => router.push("/shipping")}
              className="
                w-full mt-3 py-2.5 rounded-xl font-medium text-sm
                border border-[var(--border)] text-[var(--text-secondary)]
                hover:bg-[var(--bg-primary)] transition-all cursor-pointer
              "
            >
              ← Back to Shipping
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
