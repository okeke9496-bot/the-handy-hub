import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="product-card group relative">
      {hasDiscount && (
        <div className="absolute top-4 left-4 z-10 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
          -{discountPercentage}%
        </div>
      )}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden rounded-md mb-4 bg-neutral">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <h3 className="text-base font-heading font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold text-secondary">
            {formatPrice(product.price)}
          </p>
          {hasDiscount && (
            <p className="text-sm text-muted-foreground line-through opacity-60">
              {formatPrice(product.originalPrice!)}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
