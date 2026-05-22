"use client";

import { useState, useMemo, useEffect } from "react";
import productsData from "@/data/products.json";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/lib/types";
import { Search, ChevronDown, X } from "lucide-react";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const categories = useMemo(() => {
    const cats = new Set((productsData as Product[]).map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, []);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = productsData as Product[];

    // Filter by search
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort
    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const updateCategory = (cat: string) => {
    setSelectedCategory(cat);
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") params.delete("category");
    else params.set("category", cat);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight mb-2">Our Collection</h1>
                <p className="text-muted-foreground font-light">Showing {filteredProducts.length} unique items</p>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-12 pr-4 py-3 border rounded-sm bg-neutral/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="md:hidden p-3 border rounded-sm bg-neutral/20"
                >
                    <SlidersHorizontal className="h-5 w-5" />
                </button>
            </div>
        </div>

        {/* Desktop Filter & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-b pb-8">
            <div className="hidden md:flex items-center gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => updateCategory(cat)}
                        className={`px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-full border transition-all ${selectedCategory === cat ? 'bg-secondary text-white border-secondary' : 'bg-white text-secondary border-neutral-300 hover:border-secondary'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-4 ml-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sort By:</span>
                <div className="relative">
                    <select
                        className="pl-4 pr-10 py-2 border rounded-sm appearance-none focus:outline-none focus:ring-1 focus:ring-primary bg-white text-xs font-bold uppercase tracking-widest cursor-pointer"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="featured">Featured</option>
                        <option value="name">Name A-Z</option>
                        <option value="price-low">Price: Low-High</option>
                        <option value="price-high">Price: High-Low</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none text-muted-foreground" />
                </div>
            </div>
        </div>

        {/* Active Filters Display */}
        {(selectedCategory !== "All" || searchQuery) && (
            <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mr-2">Active:</span>
                {selectedCategory !== "All" && (
                    <span className="flex items-center gap-2 px-3 py-1 bg-neutral rounded-full text-[10px] font-bold uppercase tracking-widest">
                        Category: {selectedCategory}
                        <button onClick={() => updateCategory("All")}><X className="h-3 w-3" /></button>
                    </span>
                )}
                {searchQuery && (
                    <span className="flex items-center gap-2 px-3 py-1 bg-neutral rounded-full text-[10px] font-bold uppercase tracking-widest">
                        Search: {searchQuery}
                        <button onClick={() => setSearchQuery("")}><X className="h-3 w-3" /></button>
                    </span>
                )}
                <button 
                    onClick={() => {setSearchQuery(""); updateCategory("All");}}
                    className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline ml-2"
                >
                    Clear All
                </button>
            </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
        ) : (
            <div className="text-center py-32 bg-neutral/30 rounded-3xl border border-dashed">
                <p className="text-2xl font-heading font-bold text-secondary mb-4 uppercase tracking-tight">No products found</p>
                <p className="text-muted-foreground mb-8 font-light">Try adjusting your filters or search query.</p>
                <button 
                    onClick={() => {setSearchQuery(""); updateCategory("All");}}
                    className="btn-primary px-8 py-3"
                >
                    Reset Filters
                </button>
            </div>
        )}
      </div>

      {/* Mobile Filter Modal (Simplified) */}
      {isFilterOpen && (
          <div className="fixed inset-0 z-[200] bg-white p-8 animate-in slide-in-from-right duration-300 overflow-y-auto">
              <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-heading font-bold uppercase tracking-tight">Filters</h2>
                  <button onClick={() => setIsFilterOpen(false)}><X className="h-6 w-6" /></button>
              </div>
              <div className="space-y-8">
                  <div>
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Categories</h3>
                      <div className="flex flex-col gap-3">
                          {categories.map((cat) => (
                              <button
                                  key={cat}
                                  onClick={() => {updateCategory(cat); setIsFilterOpen(false);}}
                                  className={`text-left py-2 text-lg ${selectedCategory === cat ? 'text-primary font-bold' : 'text-secondary'}`}
                              >
                                  {cat}
                              </button>
                          ))}
                      </div>
                  </div>
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="btn-primary w-full py-4 font-bold uppercase tracking-widest"
                  >
                    Show Results
                  </button>
              </div>
          </div>
      )}
    </div>
  );
}

