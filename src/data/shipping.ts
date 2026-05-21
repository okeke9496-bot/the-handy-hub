import { ShippingOption } from "@/lib/types";

export const shippingOptions: ShippingOption[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    price: 9.99,
    estimatedDays: "5-7 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    price: 19.99,
    estimatedDays: "2-3 business days",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    price: 34.99,
    estimatedDays: "Next business day",
  },
  {
    id: "free",
    name: "Free Shipping",
    price: 0.00,
    estimatedDays: "7-10 business days",
  },
];
