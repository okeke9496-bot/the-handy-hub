"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, PromoCode, ShippingOption } from '@/lib/types';
import { promoCodes } from '@/data/promos';
import { shippingOptions } from '@/data/shipping';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  appliedPromo: PromoCode | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  selectedShipping: ShippingOption;
  setShipping: (optionId: string) => void;
  cartSubtotal: number;
  discountAmount: number;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(shippingOptions[3]); // Free shipping default

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }, []);

  // Save cart to local storage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const applyPromo = (code: string) => {
    const promo = promoCodes.find(p => p.code.toUpperCase() === code.toUpperCase() && p.active);

    if (!promo) {
      return { success: false, message: "Invalid or inactive promo code." };
    }

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    if (promo.minPurchase > 0 && subtotal < promo.minPurchase) {
      return { success: false, message: `Minimum spend of $${promo.minPurchase} required.` };
    }

    setAppliedPromo(promo);
    return { success: true, message: "Promo code applied successfully!" };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const handleSetShipping = (optionId: string) => {
    const option = shippingOptions.find(o => o.id === optionId);
    if (option) setSelectedShipping(option);
  };

  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedPromo && appliedPromo.discountPercent > 0) {
    discountAmount = cartSubtotal * (appliedPromo.discountPercent / 100);
  }

  const cartTotal = cartSubtotal - discountAmount + selectedShipping.price;
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      appliedPromo,
      applyPromo,
      removePromo,
      selectedShipping,
      setShipping: handleSetShipping,
      cartSubtotal,
      discountAmount,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};