"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, ShippingAddress } from "@/types";

interface CheckoutState {
  cartItems: CartItem[];
  shippingFee: number;
  discount: number;
  shippingAddress: ShippingAddress | null;
  orderPlaced: boolean;
  setCartData: (items: CartItem[], fee: number, discount: number) => void;
  setShippingAddress: (address: ShippingAddress) => void;
  placeOrder: () => void;
  resetOrder: () => void;
}

const CheckoutContext = createContext<CheckoutState | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingAddress, setShippingAddressState] =
    useState<ShippingAddress | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const setCartData = (
    items: CartItem[],
    fee: number,
    discountVal: number
  ) => {
    setCartItems(items);
    setShippingFee(fee);
    setDiscount(discountVal);
  };

  const setShippingAddress = (address: ShippingAddress) => {
    setShippingAddressState(address);
  };

  const placeOrder = () => {
    setOrderPlaced(true);
  };

  const resetOrder = () => {
    setOrderPlaced(false);
    setShippingAddressState(null);
  };

  return (
    <CheckoutContext.Provider
      value={{
        cartItems,
        shippingFee,
        discount,
        shippingAddress,
        orderPlaced,
        setCartData,
        setShippingAddress,
        placeOrder,
        resetOrder,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
}
