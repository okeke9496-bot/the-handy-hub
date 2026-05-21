"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    discountAmount, 
    
    appliedPromo,
    applyPromo,
    removePromo
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; text: string } | null>(null);

  const handleApplyPromo = () => {
    if (!promoInput) return;
    const result = applyPromo(promoInput);
    setPromoMessage({ success: result.success, text: result.message });
    if (result.success) setPromoInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-heading font-bold flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Your Cart
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-neutral rounded-full transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground opacity-20 mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <button
                    onClick={onClose}
                    className="mt-4 text-primary font-bold hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-neutral flex-shrink-0">
                        <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-sm leading-tight line-clamp-2">{item.name}</h3>
                            <p className="font-bold text-sm ml-2">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border rounded">
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-neutral"
                            >
                                <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 text-xs font-medium">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-neutral"
                            >
                                <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted-foreground hover:text-error transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t bg-neutral/30 space-y-4">
                {/* Promo Code Input */}
                {!appliedPromo ? (
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Promo code"
                                className="flex-1 px-3 py-2 text-sm border rounded bg-white focus:outline-none focus:ring-1 focus:ring-primary uppercase"
                                value={promoInput}
                                onChange={(e) => setPromoInput(e.target.value)}
                            />
                            <button
                                onClick={handleApplyPromo}
                                className="bg-secondary text-white px-4 py-2 text-sm rounded font-bold hover:bg-secondary/90 transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                        {promoMessage && (
                            <p className={`text-xs ${promoMessage.success ? 'text-success' : 'text-error'}`}>
                                {promoMessage.text}
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center justify-between bg-primary/10 p-3 rounded border border-primary/20 text-sm">
                        <div className="flex items-center gap-2 text-primary font-bold">
                            <Tag className="h-4 w-4" />
                            {appliedPromo.code} Applied
                        </div>
                        <button onClick={removePromo} className="text-xs text-muted-foreground hover:text-error transition-colors">
                            Remove
                        </button>
                    </div>
                )}

                <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">{formatPrice(cartSubtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                        <div className="flex justify-between text-sm text-primary font-bold">
                            <span>Discount</span>
                            <span>-{formatPrice(discountAmount)}</span>
                        </div>
                    )}
                    <div className="flex justify-between border-t pt-2 mt-2">
                        <span className="text-lg font-heading font-bold">Total</span>
                        <span className="text-xl font-heading font-bold">{formatPrice(cartSubtotal - discountAmount)}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground text-center">Shipping and taxes calculated at checkout</p>
                </div>
                
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="btn-primary w-full py-4 flex items-center justify-center gap-2 font-bold"
                >
                  Checkout
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                    href="/cart"
                    onClick={onClose}
                    className="block text-center text-sm font-medium hover:text-primary transition-colors pb-2"
                >
                    View Full Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
