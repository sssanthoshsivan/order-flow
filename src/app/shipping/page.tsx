"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { ShippingAddress } from "@/types";
import StepIndicator from "@/components/StepIndicator";

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  pinCode?: string;
  city?: string;
  state?: string;
}

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh",
];

export default function ShippingPage() {
  const router = useRouter();
  const { cartItems, setShippingAddress } = useCheckout();

  const [form, setForm] = useState<ShippingAddress>({
    fullName: "",
    email: "",
    phone: "",
    pinCode: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Redirect to cart if no items
  if (cartItems.length === 0) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-4 pb-12">
        <StepIndicator currentStep={2} />
        <div className="bg-white rounded-[var(--radius-lg)] p-8 sm:p-12 shadow-[var(--shadow-md)] border border-[var(--border)] text-center mt-4">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            Your cart is empty
          </h2>
          <p className="text-[var(--text-muted)] mb-6">
            Please add items to your cart first.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] hover:shadow-lg transition-all cursor-pointer"
          >
            ← Back to Cart
          </button>
        </div>
      </main>
    );
  }

  const validate = (data: ShippingAddress): FormErrors => {
    const errs: FormErrors = {};
    if (!data.fullName.trim() || data.fullName.trim().length < 2) {
      errs.fullName = "Full name is required (min 2 characters)";
    }
    if (!data.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = "Please enter a valid email";
    }
    if (!data.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.phone)) {
      errs.phone = "Phone must be exactly 10 digits";
    }
    if (!data.pinCode.trim()) {
      errs.pinCode = "PIN code is required";
    } else if (!/^\d{6}$/.test(data.pinCode)) {
      errs.pinCode = "PIN code must be exactly 6 digits";
    }
    if (!data.city.trim()) {
      errs.city = "City is required";
    }
    if (!data.state.trim()) {
      errs.state = "State is required";
    }
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const allTouched: Record<string, boolean> = {};
    Object.keys(form).forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setShippingAddress(form);
      router.push("/confirmation");
    }
  };

  const inputClasses = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none bg-white
    ${
      errors[field] && touched[field]
        ? "border-[var(--error)] bg-[var(--error-bg)] focus:ring-2 focus:ring-red-200"
        : "border-[var(--border)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]"
    }`;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-4 pb-12">
      <StepIndicator currentStep={2} />

      <div className="max-w-2xl mx-auto mt-4">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
          Shipping Address
        </h1>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-[var(--radius-lg)] p-5 sm:p-8 shadow-[var(--shadow-md)] border border-[var(--border)]"
        >
          <div className="space-y-5">
            {/* Full Name */}
            <div className="animate-slide-up delay-100">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                Full Name <span className="text-[var(--error)]">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                onBlur={() => handleBlur("fullName")}
                placeholder="e.g. Priya Sharma"
                className={inputClasses("fullName")}
              />
              {errors.fullName && touched.fullName && (
                <p className="text-xs text-[var(--error)] mt-1 flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-slide-up delay-200">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Email <span className="text-[var(--error)]">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  placeholder="priya@example.com"
                  className={inputClasses("email")}
                />
                {errors.email && touched.email && (
                  <p className="text-xs text-[var(--error)] mt-1 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Phone Number <span className="text-[var(--error)]">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={() => handleBlur("phone")}
                  placeholder="9876543210"
                  className={inputClasses("phone")}
                />
                {errors.phone && touched.phone && (
                  <p className="text-xs text-[var(--error)] mt-1 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* PIN Code & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-slide-up delay-300">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  PIN Code <span className="text-[var(--error)]">*</span>
                </label>
                <input
                  id="pinCode"
                  type="text"
                  name="pinCode"
                  value={form.pinCode}
                  onChange={handleChange}
                  onBlur={() => handleBlur("pinCode")}
                  placeholder="560001"
                  maxLength={6}
                  className={inputClasses("pinCode")}
                />
                {errors.pinCode && touched.pinCode && (
                  <p className="text-xs text-[var(--error)] mt-1 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    {errors.pinCode}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  City <span className="text-[var(--error)]">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  onBlur={() => handleBlur("city")}
                  placeholder="Bengaluru"
                  className={inputClasses("city")}
                />
                {errors.city && touched.city && (
                  <p className="text-xs text-[var(--error)] mt-1 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    {errors.city}
                  </p>
                )}
              </div>
            </div>

            {/* State */}
            <div className="animate-slide-up delay-400">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                State <span className="text-[var(--error)]">*</span>
              </label>
              <select
                id="state"
                name="state"
                value={form.state}
                onChange={handleChange}
                onBlur={() => handleBlur("state")}
                className={inputClasses("state")}
              >
                <option value="">Select State</option>
                {indianStates.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.state && touched.state && (
                <p className="text-xs text-[var(--error)] mt-1 flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  {errors.state}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="
                flex-1 py-3 rounded-xl font-semibold text-sm
                border border-[var(--border)] text-[var(--text-secondary)]
                hover:bg-[var(--bg-primary)] transition-all cursor-pointer
              "
            >
              ← Back to Cart
            </button>
            <button
              type="submit"
              className="
                flex-1 py-3.5 rounded-xl font-semibold text-white text-sm
                bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)]
                hover:from-[var(--accent-light)] hover:to-[var(--accent)]
                shadow-md hover:shadow-lg
                transform hover:-translate-y-0.5 active:translate-y-0
                transition-all duration-200 cursor-pointer
              "
            >
              Continue to Payment →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
