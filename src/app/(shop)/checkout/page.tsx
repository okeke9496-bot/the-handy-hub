"use client";

import { useState } from "react";
import Image from "next/image"
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, ChevronRight, CreditCard, Truck, Lock, ShieldCheck, Tag } from "lucide-react";
import Link from "next/link";
import { shippingOptions } from "@/data/shipping";

export default function CheckoutPage() {
  const { 
    cart, 
    cartSubtotal, 
    discountAmount, 
    cartTotal, 
    selectedShipping, 
    setShipping,
    appliedPromo,
    clearCart
  } = useCart();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  });

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4 uppercase">Your cart is empty</h1>
        <Link href="/products" className="text-primary hover:underline font-bold text-xs uppercase tracking-widest">
          Return to Shopping
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    // In a real app, call Stripe and backend here
    setStep(3);
    clearCart();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10 text-xs font-bold uppercase tracking-widest">
          <Link href="/cart" className="text-muted-foreground hover:text-primary transition-colors">Cart</Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
          <span className={step >= 1 ? "text-primary" : "text-muted-foreground"}>Shipping</span>
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
          <span className={step >= 2 ? "text-primary" : "text-muted-foreground"}>Payment</span>
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
          <span className={step >= 3 ? "text-primary" : "text-muted-foreground"}>Confirmation</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Form Area */}
          <div>
            {step === 1 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                    <h2 className="text-3xl font-heading font-bold flex items-center gap-4 uppercase tracking-tight mb-8">
                        <Truck className="h-8 w-8 text-primary" />
                        Shipping Info
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-secondary">First Name</label>
                            <input 
                                type="text" 
                                className="w-full p-4 border rounded-sm bg-neutral/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-all" 
                                placeholder="John" 
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-secondary">Last Name</label>
                            <input 
                                type="text" 
                                className="w-full p-4 border rounded-sm bg-neutral/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-all" 
                                placeholder="Doe" 
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-secondary">Email Address</label>
                            <input 
                                type="email" 
                                className="w-full p-4 border rounded-sm bg-neutral/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-all" 
                                placeholder="john@example.com" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-secondary">Shipping Address</label>
                            <input 
                                type="text" 
                                className="w-full p-4 border rounded-sm bg-neutral/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-all" 
                                placeholder="123 Modern Way" 
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-secondary">City</label>
                            <input 
                                type="text" 
                                className="w-full p-4 border rounded-sm bg-neutral/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-all" 
                                placeholder="New York" 
                                value={formData.city}
                                onChange={(e) => setFormData({...formData, city: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-secondary">State</label>
                            <input 
                                type="text" 
                                className="w-full p-4 border rounded-sm bg-neutral/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-all" 
                                placeholder="NY" 
                                value={formData.state}
                                onChange={(e) => setFormData({...formData, state: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-secondary">Zip Code</label>
                            <input 
                                type="text" 
                                className="w-full p-4 border rounded-sm bg-neutral/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-all" 
                                placeholder="10001" 
                                value={formData.zip}
                                onChange={(e) => setFormData({...formData, zip: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-heading font-bold uppercase tracking-tight mb-6">Select Shipping Method</h2>
                    <div className="space-y-3">
                        {shippingOptions.map((option) => (
                            <label 
                                key={option.id}
                                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${selectedShipping.id === option.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-primary/50 bg-neutral/10'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="radio" 
                                        name="shipping" 
                                        className="accent-primary"
                                        checked={selectedShipping.id === option.id}
                                        onChange={() => setShipping(option.id)}
                                    />
                                    <div>
                                        <p className="font-bold text-sm">{option.name}</p>
                                        <p className="text-xs text-muted-foreground">{option.estimatedDays}</p>
                                    </div>
                                </div>
                                <span className="font-bold text-sm">{option.price === 0 ? 'FREE' : formatPrice(option.price)}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="btn-primary w-full py-5 text-lg font-bold uppercase tracking-widest shadow-xl shadow-primary/20"
                >
                  Proceed to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-heading font-bold flex items-center gap-4 uppercase tracking-tight">
                  <CreditCard className="h-8 w-8 text-primary" />
                  Payment
                </h2>
                <div className="bg-neutral p-8 rounded-2xl border border-primary/20 shadow-inner">
                    <p className="text-sm font-bold mb-6 flex items-center gap-2 text-secondary uppercase tracking-widest">
                        <Lock className="h-4 w-4 text-success" />
                        Secure Checkout
                    </p>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-secondary">Card Number</label>
                            <div className="w-full p-4 border rounded-sm bg-white font-mono text-lg tracking-widest">4242 4242 4242 4242</div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Expiry Date</label>
                                <div className="w-full p-4 border rounded-sm bg-white font-mono">12 / 26</div>
                            </div>
                             <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-secondary">CVC</label>
                                <div className="w-full p-4 border rounded-sm bg-white font-mono">***</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-success/10 border border-success/20 p-4 rounded-lg flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-success" />
                    <p className="text-xs font-medium text-success">Your payment information is encrypted and processed securely via Stripe.</p>
                </div>
                <button 
                  onClick={handlePlaceOrder}
                  className="btn-primary w-full py-5 text-xl font-bold uppercase tracking-widest shadow-xl shadow-primary/20"
                >
                  Pay {formatPrice(cartTotal)}
                </button>
                <button 
                  onClick={() => setStep(1)}
                  className="w-full text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors py-2"
                >
                  Back to shipping
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-8 py-20 animate-in zoom-in duration-500">
                <div className="h-24 w-24 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-success/20">
                    <CheckCircle className="h-12 w-12" />
                </div>
                <h2 className="text-5xl font-heading font-bold uppercase tracking-tighter">Order Confirmed</h2>
                <p className="text-lg text-muted-foreground max-w-md mx-auto font-light leading-relaxed">
                    Thank you, <span className="font-bold text-secondary">{formData.firstName}</span>! Your order <span className="font-bold text-secondary">#HH-{Math.floor(Math.random()*90000) + 10000}</span> has been successfully placed. We have sent a confirmation email to <span className="font-medium text-secondary">{formData.email}</span>.
                </p>
                <div className="pt-4">
                    <Link href="/" className="btn-primary inline-block px-12 py-4 font-bold uppercase tracking-widest">
                        Continue Shopping
                    </Link>
                </div>
              </div>
            )}
          </div>

          {/* Summary Area */}
          <div className="bg-neutral/40 p-10 rounded-2xl h-fit border border-neutral sticky top-24">
            <h3 className="text-xl font-heading font-bold mb-8 uppercase tracking-tight flex items-center gap-3">
                <ShoppingBag className="h-5 w-5" />
                Your Order
            </h3>
            <div className="space-y-6 mb-10 overflow-y-auto max-h-[300px] pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 relative rounded-lg overflow-hidden flex-shrink-0 border">
                        <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                        <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-sm">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-300 pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping ({selectedShipping.name})</span>
                <span className="font-bold text-secondary">{selectedShipping.price === 0 ? 'FREE' : formatPrice(selectedShipping.price)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-sm text-primary font-bold bg-primary/5 p-2 rounded">
                    <span className="flex items-center gap-1 uppercase">
                        <Tag className="h-3 w-3" />
                        Promo ({appliedPromo.code})
                    </span>
                    <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Tax (8%)</span>
                <span className="font-bold">{formatPrice((cartSubtotal - discountAmount) * 0.08)}</span>
              </div>
              <div className="flex justify-between text-2xl font-heading font-bold pt-4 border-t border-neutral-300">
                <span className="uppercase">Total</span>
                <span className="text-primary">{formatPrice(cartTotal + (cartSubtotal - discountAmount) * 0.08)}</span>
              </div>
            </div>

            {/* Refund Policy */}
            <p className="mt-8 text-[10px] text-center text-muted-foreground uppercase tracking-widest leading-relaxed">
                Free 30-day returns • Guaranteed quality • Secure transaction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircle({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}
