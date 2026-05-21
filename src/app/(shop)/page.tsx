import Image from "next/image";
import Link from "next/link";
import productsData from "@/data/products.json";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/lib/types";

export default function Home() {
  const featuredProducts = (productsData as Product[]).filter(p => p.featured).slice(0, 4);
  const categories = Array.from(new Set((productsData as Product[]).map(p => p.category))).slice(0, 4);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden bg-secondary">
        <Image
          src="/design/hero-banner.png"
          alt="The Handy Hub Hero"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight uppercase">
              Quality Essentials for Your Home
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto font-light">
              Discover a curated collection of modern, stylish, and functional items designed for everyday living.
            </p>
            <Link href="/products" className="btn-primary text-lg px-10 py-4 font-bold rounded-sm">
              SHOP COLLECTION
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-heading font-bold uppercase tracking-tight">Featured Collection</h2>
          <Link href="/products" className="text-primary font-bold hover:underline tracking-widest text-xs uppercase">
            View All Products
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="bg-neutral py-20">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold mb-12 text-center uppercase tracking-tight">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
                <Link
                key={category}
                href={`/products?category=${category}`}
                className="group relative h-64 overflow-hidden rounded-lg bg-white flex items-center justify-center transition-all hover:shadow-xl border"
                >
                <div className="text-center">
                    <span className="text-xl font-heading font-bold group-hover:text-primary transition-colors block uppercase tracking-widest">
                        {category}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase mt-2 block tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore Now
                    </span>
                </div>
                </Link>
            ))}
            </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="container mx-auto px-4">
        <div className="bg-secondary text-white rounded-2xl overflow-hidden flex flex-col md:row items-center border border-secondary shadow-2xl">
          <div className="flex-1 p-12 lg:p-20 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 uppercase leading-none">Premium Quality,<br/>Everyday Price</h2>
            <p className="text-lg opacity-70 mb-10 max-w-lg font-light leading-relaxed">
              We believe that everyday items should be beautiful and built to last. Our collection is carefully selected to bring you the best in design and utility.
            </p>
            <Link href="/products" className="btn-primary inline-block px-10 py-4 font-bold rounded-sm">
              DISCOVER MORE
            </Link>
          </div>
          <div className="flex-1 relative w-full h-[500px]">
             <Image
              src="/design/product-10-organizer.png"
              alt="Promo"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div>
            <h3 className="text-lg font-bold uppercase mb-4 tracking-widest">Premium Quality</h3>
            <p className="text-sm text-muted-foreground font-light">We source the finest materials to ensure every product meets our high standards of durability and style.</p>
        </div>
        <div>
            <h3 className="text-lg font-bold uppercase mb-4 tracking-widest">Modern Design</h3>
            <p className="text-sm text-muted-foreground font-light">Our aesthetic is clean, functional, and timeless, fitting perfectly into any modern home environment.</p>
        </div>
        <div>
            <h3 className="text-lg font-bold uppercase mb-4 tracking-widest">Customer First</h3>
            <p className="text-sm text-muted-foreground font-light">From easy returns to responsive support, we're dedicated to providing a premium shopping experience.</p>
        </div>
      </section>
    </div>
  );
}
