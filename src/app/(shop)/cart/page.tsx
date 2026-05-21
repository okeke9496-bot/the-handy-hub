"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <ShoppingBag className="h-20 w-20 text-muted-foreground opacity-20" />
        </div>
        <h1 className="text-3xl font-heading font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link href="/products" className="btn-primary inline-block text-lg px-8 py-3">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-6 border-b pb-6">
                <div className="relative h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-lg bg-neutral flex-shrink-0">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-lg font-bold">
                      <Link href={`/products/${item.id}`} className="hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="font-bold text-secondary">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-1">{item.category}</p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-neutral transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-neutral transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-error hover:text-error/80 transition-colors flex items-center gap-1 text-sm font-medium"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-neutral p-8 rounded-2xl sticky top-24">
            <h2 className="text-2xl font-heading font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-success">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span className="font-medium">{formatPrice(cartTotal * 0.08)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="text-xl font-bold">Total</span>
                <span className="text-xl font-bold">{formatPrice(cartTotal * 1.08)}</span>
              </div>
            </div>
            
            <Link 
              href="/checkout" 
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg font-bold"
            >
              Checkout
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <p className="mt-4 text-xs text-center text-muted-foreground">
              Taxes and shipping calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
