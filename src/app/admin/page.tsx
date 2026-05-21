"use client";

import { useState } from "react";
import productsData from "@/data/products.json";
import { Product, Order, PromoCode } from "@/lib/types";
import { promoCodes as initialPromos } from "@/data/promos";
import { Plus, Edit, Trash2, LayoutDashboard, ShoppingCart, Package, LogOut, Tag, Search, MoreVertical, CheckCircle2, Clock, Truck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Mock Data
  const [products, setProducts] = useState<Product[]>(productsData as Product[]);
  const [promos, setPromos] = useState<PromoCode[]>(initialPromos);
  const [orders, setOrders] = useState<Order[]>([
    {
        id: "ORD-92831",
        items: [],
        subtotal: 124.00,
        shipping: { id: "express", name: "Express", description: "2-3 days", price: 9.99, estimatedDays: "2-3" },
        discount: 20.00,
        total: 123.11,
        status: 'paid',
        customerName: "Jane Smith",
        customerEmail: "jane@example.com",
        shippingAddress: { line1: "456 Oak Rd", city: "Austin", state: "TX", zip: "78701", country: "US" },
        createdAt: "2024-05-18T10:30:00Z"
    },
    {
        id: "ORD-92832",
        items: [],
        subtotal: 45.00,
        shipping: { id: "free", name: "Free Shipping", description: "6-10 days", price: 0, estimatedDays: "6-10" },
        discount: 0.00,
        total: 48.60,
        status: 'shipped',
        customerName: "Robert Brown",
        customerEmail: "rob@example.com",
        shippingAddress: { line1: "789 Pine Ln", city: "Seattle", state: "WA", zip: "98101", country: "US" },
        createdAt: "2024-05-20T14:15:00Z"
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid password");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral">
        <div className="bg-white p-12 rounded-2xl shadow-xl w-full max-w-md border">
          <div className="flex justify-center mb-8">
            <Image src="/design/logo.png" alt="Logo" width={60} height={60} />
          </div>
          <h1 className="text-3xl font-heading font-bold mb-8 text-center uppercase tracking-tight">Admin Portal</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
              <input
                type="password"
                className="w-full p-4 border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary bg-neutral/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="btn-primary w-full py-4 font-bold uppercase tracking-widest">
              Access Dashboard
            </button>
            <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest">Hint: admin123</p>
          </form>
        </div>
      </div>
    );
  }

  const togglePromo = (code: string) => {
    setPromos(promos.map(p => p.code === code ? { ...p, active: !p.active } : p));
  };

  return (
    <div className="min-h-screen flex bg-neutral/50">
      {/* Sidebar */}
      <aside className="w-72 bg-secondary text-white p-10 hidden lg:flex flex-col">
        <div className="flex items-center gap-3 mb-16">
            <Image src="/design/logo.png" alt="Logo" width={32} height={32} className="brightness-0 invert" />
            <h2 className="text-lg font-heading font-bold tracking-tighter uppercase">The Handy Hub</h2>
        </div>
        
        <nav className="space-y-4 flex-1">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-4 w-full p-4 rounded-sm font-bold text-xs uppercase tracking-widest transition-all ${activeTab === "dashboard" ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </button>
          <button 
             onClick={() => setActiveTab("products")}
             className={`flex items-center gap-4 w-full p-4 rounded-sm font-bold text-xs uppercase tracking-widest transition-all ${activeTab === "products" ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
          >
            <Package className="h-5 w-5" />
            Products
          </button>
          <button 
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-4 w-full p-4 rounded-sm font-bold text-xs uppercase tracking-widest transition-all ${activeTab === "orders" ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
          </button>
          <button 
             onClick={() => setActiveTab("promos")}
             className={`flex items-center gap-4 w-full p-4 rounded-sm font-bold text-xs uppercase tracking-widest transition-all ${activeTab === "promos" ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
          >
            <Tag className="h-5 w-5" />
            Promo Codes
          </button>
        </nav>

        <button 
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-4 w-full p-4 text-white/50 hover:text-white font-bold text-xs uppercase tracking-widest mt-auto border-t border-white/10 pt-8"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-16 overflow-auto">
        <div className="max-w-7xl mx-auto">
            {/* Dashboard View */}
            {activeTab === "dashboard" && (
                <div className="animate-in fade-in duration-500">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <p className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-2">Overview</p>
                            <h1 className="text-4xl font-heading font-bold uppercase tracking-tight">Business Summary</h1>
                        </div>
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Last updated</p>
                            <p className="text-sm font-medium">Today at 10:45 AM</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        <StatCard title="Total Revenue" value="$42,950.00" subValue="+12% from last month" color="primary" />
                        <StatCard title="Total Orders" value="1,240" subValue="+8% from last month" />
                        <StatCard title="Total Products" value={products.length.toString()} subValue="12 categories" />
                        <StatCard title="Conversion Rate" value="3.2%" subValue="-0.5% from last month" color="error" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="bg-white p-10 rounded-2xl border shadow-sm">
                            <h3 className="text-xl font-bold uppercase mb-8 flex items-center gap-3">
                                <Clock className="h-5 w-5 text-primary" />
                                Recent Activity
                            </h3>
                            <div className="space-y-6">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="flex gap-4 pb-6 border-b last:border-0 last:pb-0">
                                        <div className="h-10 w-10 rounded-full bg-neutral flex items-center justify-center flex-shrink-0">
                                            <ShoppingCart className="h-4 w-4 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">New order #ORD-{Math.floor(Math.random()*90000)}</p>
                                            <p className="text-xs text-muted-foreground">User {i === 1 ? 'John Doe' : 'Guest'} purchased items totalling $120.00</p>
                                            <p className="text-[10px] text-muted-foreground uppercase mt-1">2 minutes ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-10 rounded-2xl border shadow-sm">
                             <h3 className="text-xl font-bold uppercase mb-8 flex items-center gap-3">
                                <Package className="h-5 w-5 text-primary" />
                                Inventory Alerts
                            </h3>
                            <div className="space-y-6">
                                {products.slice(0, 4).map(p => (
                                    <div key={p.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 relative rounded border overflow-hidden">
                                                <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">{p.name}</p>
                                                <p className="text-xs text-muted-foreground">{p.category}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold">{p.stock} left</p>
                                            <div className="w-24 h-1.5 bg-neutral rounded-full mt-1 overflow-hidden">
                                                <div className={`h-full bg-primary`} style={{ width: `${(p.stock/50)*100}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Products View */}
            {activeTab === "products" && (
                <div className="animate-in fade-in duration-500">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
                        <div>
                            <p className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-2">Inventory</p>
                            <h1 className="text-4xl font-heading font-bold uppercase tracking-tight">Product Catalog</h1>
                        </div>
                        <button className="btn-primary flex items-center gap-3 py-3 px-8 font-bold uppercase tracking-widest text-xs">
                            <Plus className="h-4 w-4" />
                            Add New Product
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                        <div className="p-6 border-b bg-neutral/20 flex gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input type="text" placeholder="Search products..." className="w-full pl-12 pr-4 py-2 text-sm border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                            </div>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-neutral border-b">
                                <tr className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                                    <th className="p-6">Product</th>
                                    <th className="p-6">Category</th>
                                    <th className="p-6">Price</th>
                                    <th className="p-6">Stock</th>
                                    <th className="p-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {products.map((p) => (
                                    <tr key={p.id} className="hover:bg-neutral/30 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-16 w-16 relative rounded-lg border overflow-hidden flex-shrink-0">
                                                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                                                </div>
                                                <span className="font-bold text-sm text-secondary">{p.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="text-xs font-bold uppercase tracking-widest bg-neutral px-3 py-1 rounded-full text-muted-foreground">
                                                {p.category}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <p className="font-bold text-sm">{formatPrice(p.price)}</p>
                                            {p.originalPrice && (
                                                <p className="text-[10px] text-muted-foreground line-through opacity-50">{formatPrice(p.originalPrice)}</p>
                                            )}
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <span className={`h-2 w-2 rounded-full ${p.stock > 10 ? 'bg-success' : 'bg-warning'}`}></span>
                                                <span className="text-sm font-medium">{p.stock} units</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-neutral rounded text-secondary"><Edit className="h-4 w-4" /></button>
                                                <button className="p-2 hover:bg-error/10 rounded text-error"><Trash2 className="h-4 w-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Orders View */}
            {activeTab === "orders" && (
                <div className="animate-in fade-in duration-500">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <p className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-2">Sales</p>
                            <h1 className="text-4xl font-heading font-bold uppercase tracking-tight">Recent Orders</h1>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-neutral border-b text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                                <tr>
                                    <th className="p-6">Order ID</th>
                                    <th className="p-6">Customer</th>
                                    <th className="p-6">Status</th>
                                    <th className="p-6">Total</th>
                                    <th className="p-6 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {orders.map((o) => (
                                    <tr key={o.id} className="hover:bg-neutral/30 transition-colors cursor-pointer">
                                        <td className="p-6 font-bold text-sm text-primary">{o.id}</td>
                                        <td className="p-6">
                                            <p className="font-bold text-sm">{o.customerName.split(" ")[0]} {o.customerName.split(" ")[1]}</p>
                                            <p className="text-xs text-muted-foreground">{o.customerEmail}</p>
                                        </td>
                                        <td className="p-6">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                                o.status === 'paid' ? 'bg-success/10 text-success' : 
                                                o.status === 'shipped' ? 'bg-primary/10 text-primary' : 'bg-neutral text-muted-foreground'
                                            }`}>
                                                {o.status === 'paid' && <CheckCircle2 className="h-3 w-3" />}
                                                {o.status === 'shipped' && <Truck className="h-3 w-3" />}
                                                {o.status}
                                            </span>
                                        </td>
                                        <td className="p-6 font-bold text-sm">{formatPrice(o.total)}</td>
                                        <td className="p-6 text-right text-xs text-muted-foreground font-medium">
                                            {new Date(o.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Promos View */}
            {activeTab === "promos" && (
                <div className="animate-in fade-in duration-500">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
                        <div>
                            <p className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-2">Marketing</p>
                            <h1 className="text-4xl font-heading font-bold uppercase tracking-tight">Promo Codes</h1>
                        </div>
                        <button className="btn-primary flex items-center gap-3 py-3 px-8 font-bold uppercase tracking-widest text-xs">
                            <Plus className="h-4 w-4" />
                            Create New Code
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {promos.map((p) => (
                            <div key={p.code} className={`bg-white p-8 rounded-2xl border shadow-sm transition-all ${!p.active ? 'opacity-50 grayscale' : 'hover:shadow-md'}`}>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Tag className="h-6 w-6" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${p.active ? 'bg-success/10 text-success' : 'bg-neutral text-muted-foreground'}`}>
                                            {p.active ? 'Active' : 'Inactive'}
                                        </span>
                                        <button className="text-muted-foreground hover:text-secondary"><MoreVertical className="h-5 w-5" /></button>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-secondary mb-2">{p.code}</h3>
                                <p className="text-sm font-medium mb-6">
                                    {p.discountType === 'percentage' ? `${p.value}% OFF` : `${formatPrice(p.value)} OFF`}
                                    {p.minSpend && <span className="text-muted-foreground block text-xs mt-1 italic">Min spend: {formatPrice(p.minSpend)}</span>}
                                </p>
                                <button 
                                    onClick={() => togglePromo(p.code)}
                                    className={`w-full py-3 rounded text-xs font-bold uppercase tracking-widest transition-colors ${p.active ? 'bg-neutral text-secondary hover:bg-neutral/80' : 'bg-secondary text-white hover:bg-secondary/90'}`}
                                >
                                    {p.active ? 'Deactivate' : 'Activate'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, subValue, color = "secondary" }: { title: string, value: string, subValue: string, color?: string }) {
    return (
        <div className="bg-white p-10 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">{title}</p>
            <p className={`text-4xl font-heading font-bold mb-2 text-${color === 'primary' ? 'primary' : 'secondary'}`}>{value}</p>
            <p className={`text-xs font-bold ${color === 'error' ? 'text-error' : 'text-success'}`}>{subValue}</p>
        </div>
    );
}
