import Navbar from "@/components/layout/Navbar";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t py-12 bg-neutral">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 font-heading">THE HANDY HUB</h3>
            <p className="text-sm text-muted-foreground">
              Modern, stylish general merchandise for your everyday needs.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 font-heading">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/products" className="hover:text-primary transition-colors">All Products</a></li>
              <li><a href="/products?category=Kitchen" className="hover:text-primary transition-colors">Kitchen</a></li>
              <li><a href="/products?category=Home Decor" className="hover:text-primary transition-colors">Home Decor</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 font-heading">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="/shipping" className="hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="/returns" className="hover:text-primary transition-colors">Returns & Exchanges</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 font-heading">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe for updates and exclusive offers.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-white border p-2 text-sm rounded flex-1" />
              <button className="bg-secondary text-white px-4 py-2 text-sm rounded">Join</button>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} THE HANDY HUB. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
