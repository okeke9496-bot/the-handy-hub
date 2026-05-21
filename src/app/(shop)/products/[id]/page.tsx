"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import productsData from "@/data/products.json";
import { Product, Review } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { Star, Truck, ShieldCheck, ArrowLeft, Plus, Minus, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  // Review Form State
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  const product = useMemo(() => {
    return (productsData as Product[]).find((p) => p.id === id);
  }, [id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return (productsData as Product[])
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  useEffect(() => {
    const saved = localStorage.getItem(`reviews_${id}`);
    if (saved) setLocalReviews(JSON.parse(saved));
  }, [id]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: Date.now().toString(),
      productId: id as string,
      customerName: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    const updated = [newReview, ...localReviews];
    setLocalReviews(updated);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updated));
    setReviewName("");
    setReviewComment("");
    setReviewRating(5);
    setShowReviewSuccess(true);
    setTimeout(() => setShowReviewSuccess(false), 3000);
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href="/products" className="text-primary hover:underline font-bold uppercase tracking-widest text-xs">
          Back to Products
        </Link>
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/products" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary mb-10 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
        {/* Image Gallery */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral shadow-inner">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {hasDiscount && (
             <div className="absolute top-6 left-6 bg-primary text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                SALE
             </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-xs text-primary font-bold uppercase tracking-[0.2em] mb-4 block">
                {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight text-secondary">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`h-5 w-5 ${s <= 4 ? "fill-warning text-warning" : "text-muted-foreground"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-medium">({24 + localReviews.length} Verified Reviews)</span>
            </div>

            <div className="flex items-end gap-4 mb-8">
                <p className="text-4xl font-heading font-bold text-secondary">
                    {formatPrice(product.price)}
                </p>
                {hasDiscount && (
                    <p className="text-xl text-muted-foreground line-through opacity-50 mb-1">
                        {formatPrice(product.originalPrice!)}
                    </p>
                )}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed font-light mb-10">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mb-12">
            <div className="flex items-center border-2 border-neutral rounded-md bg-neutral/30">
                <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-4 hover:text-primary transition-colors"
                >
                    <Minus className="h-5 w-5" />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-4 hover:text-primary transition-colors"
                >
                    <Plus className="h-5 w-5" />
                </button>
            </div>
            <button
              onClick={() => {
                for(let i=0; i<quantity; i++) addToCart(product);
                setQuantity(1);
              }}
              className="btn-primary py-4 px-12 text-lg font-bold flex-1 uppercase tracking-widest shadow-xl shadow-primary/20"
            >
              Add to Cart
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-10">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-neutral flex items-center justify-center">
                <Truck className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="font-bold text-sm uppercase tracking-wider">Free Delivery</p>
                <p className="text-muted-foreground text-xs">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-neutral flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="font-bold text-sm uppercase tracking-wider">Quality Guarantee</p>
                <p className="text-muted-foreground text-xs">2 year extended warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs / Reviews */}
      <section className="mb-24">
        <div className="flex border-b mb-10 overflow-x-auto">
            <button 
                onClick={() => setActiveTab("description")}
                className={`py-4 px-8 text-sm font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === "description" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-secondary"}`}
            >
                Description
            </button>
            <button 
                onClick={() => setActiveTab("reviews")}
                className={`py-4 px-8 text-sm font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === "reviews" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-secondary"}`}
            >
                Reviews ({24 + localReviews.length})
            </button>
        </div>

        {activeTab === "description" ? (
            <div className="max-w-3xl font-light leading-loose text-muted-foreground">
                <p className="mb-6">
                    Our {product.name} represents the pinnacle of modern design and functional utility. Crafted with premium materials, this piece is designed to provide lasting performance while enhancing the aesthetic of your living space.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Premium quality materials sourced responsibly</li>
                    <li>Ergonomic design for maximum comfort and ease of use</li>
                    <li>Sleek, minimalist aesthetic that fits any modern home</li>
                    <li>Highly durable construction built for everyday use</li>
                    <li>Eco-friendly manufacturing processes</li>
                </ul>
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="col-span-1">
                    <div className="bg-neutral p-10 rounded-2xl text-center border">
                        <p className="text-6xl font-heading font-bold mb-4 text-secondary">4.8</p>
                        <div className="flex justify-center mb-6">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className="h-6 w-6 fill-warning text-warning" />
                            ))}
                        </div>
                        <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Based on {24 + localReviews.length} reviews</p>
                    </div>

                    {/* Review Form */}
                    <div className="mt-12 bg-white p-8 rounded-2xl border shadow-sm">
                        <h3 className="text-xl font-bold mb-6 uppercase tracking-tight">Write a Review</h3>
                        {showReviewSuccess ? (
                            <div className="flex flex-col items-center justify-center py-6 text-center text-success">
                                <CheckCircle2 className="h-12 w-12 mb-4" />
                                <p className="font-bold">Thank you for your review!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleAddReview} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-widest">Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full p-3 border rounded text-sm bg-neutral/20 focus:bg-white transition-colors"
                                        value={reviewName}
                                        onChange={(e) => setReviewName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-widest">Rating</label>
                                    <select 
                                        className="w-full p-3 border rounded text-sm bg-neutral/20 focus:bg-white"
                                        value={reviewRating}
                                        onChange={(e) => setReviewRating(Number(e.target.value))}
                                    >
                                        <option value="5">5 Stars - Excellent</option>
                                        <option value="4">4 Stars - Very Good</option>
                                        <option value="3">3 Stars - Average</option>
                                        <option value="2">2 Stars - Poor</option>
                                        <option value="1">1 Star - Terrible</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-widest">Comment</label>
                                    <textarea 
                                        required
                                        rows={4}
                                        className="w-full p-3 border rounded text-sm bg-neutral/20 focus:bg-white transition-colors"
                                        value={reviewComment}
                                        onChange={(e) => setReviewComment(e.target.value)}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-primary w-full py-3 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                    <Send className="h-4 w-4" />
                                    Post Review
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="col-span-1 md:col-span-2">
                    <div className="space-y-10">
                        {/* Local Reviews First */}
                        {localReviews.map((rev) => (
                            <div key={rev.id} className="border-b pb-10">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {rev.customerName.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-secondary">{rev.customerName}</p>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <Star key={s} className={`h-3.5 w-3.5 ${s <= rev.rating ? "fill-warning text-warning" : "text-muted-foreground"}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{rev.createdAt}</span>
                                </div>
                                <p className="text-muted-foreground leading-relaxed font-light">
                                    {rev.comment}
                                </p>
                            </div>
                        ))}

                        {/* Seeded Reviews Placeholder */}
                        {[1, 2].map((i) => (
                            <div key={i} className="border-b pb-10">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-neutral flex items-center justify-center text-secondary font-bold">
                                            {i === 1 ? 'A' : 'M'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-secondary">{i === 1 ? 'Alex Thompson' : 'Michael Chen'}</p>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <Star key={s} className={`h-3.5 w-3.5 ${s <= (i === 1 ? 5 : 4) ? "fill-warning text-warning" : "text-muted-foreground"}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">January {10 + i}, 2024</span>
                                </div>
                                <p className="text-muted-foreground leading-relaxed font-light">
                                    {i === 1 
                                        ? "Absolutely love this! The quality is even better than expected. It fits perfectly with my kitchen decor. Shipping was super fast too." 
                                        : "Great value for the money. Solid construction and looks very premium. I'm considering buying another set as a gift."}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-heading font-bold uppercase tracking-tight">You May Also Like</h2>
                <Link href={`/products?category=${product.category}`} className="text-primary font-bold hover:underline tracking-widest text-xs uppercase">
                    View More {product.category}
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
      )}
    </div>
  );
}
