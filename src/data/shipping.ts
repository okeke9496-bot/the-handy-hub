import { ShippingOption } from "@/lib/types";

export const shippingOptions: ShippingOption[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 4.99,
    estimatedDays: "5-7",
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "2-3 business days",
    price: 12.99,
    estimatedDays: "2-3",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next business day delivery",
    price: 24.99,
    estimatedDays: "1",
  },
  {
    id: "free",
    name: "Free Shipping",
    description: "6-10 business days (Orders over $50)",
    price: 0,
    estimatedDays: "6-10",
  },
];