import { PromoCode } from "@/lib/types";

export const promoCodes: PromoCode[] = [
  {
    code: "WELCOME20",
    discountType: "percentage",
    value: 20,
    minSpend: 50,
    active: true,
  },
  {
    code: "HANDY10",
    discountType: "fixed",
    value: 10,
    active: true,
  },
  {
    code: "SALE25",
    discountType: "percentage",
    value: 25,
    minSpend: 100,
    active: true,
  },
  {
    code: "FREESHIP",
    discountType: "fixed",
    value: 0, // Handled separately if price-based, but here we can just make it a marker
    active: true,
  },
];
