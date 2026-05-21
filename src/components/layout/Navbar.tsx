"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Navbar() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-2 md:gap-8">
            <button className="md:hidden p-2 hover:bg-neutral rounded-md">
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/design/logo.png" 
                alt="THE HANDY HUB" 
                width={40} 
                height={40} 
                className="w-auto h-10"
              />
              <span className="text-xl font-heading font-bold tracking-tighter text-secondary hidden sm:inline-block uppercase">
                THE HANDY HUB
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-secondary/70">
              <Link href="/products" className="transition-colors hover:text-primary">
                Products
              </Link>
              <Link href="/products?category=Kitchen" className="transition-colors hover:text-primary">
                Kitchen
              </Link>
              <Link href="/products?category=Home Decor" className="transition-colors hover:text-primary">
                Home
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden lg:flex relative group">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="search"
                placeholder="Search items..."
                className="h-10 w-64 rounded-full border border-input bg-neutral px-10 py-1 text-sm transition-all focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:w-80"
              />
            </div>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 transition-colors hover:text-primary text-secondary"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm border border-white">
                  {cartCount}
                </span>
              )}
            </button>
            
            <Link href="/admin" className="p-2 transition-colors hover:text-primary text-secondary">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
