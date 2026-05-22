import { PromoCode } from "@/lib/types";

export const promoCodes: PromoCode[] = [
  {
    code: "WELCOME20",
    discountPercent: 20,
    minPurchase: 30,
    active: true,
  },
  {
    code: "HANDY10",
    discountPercent: 10,
    minPurchase: 0,
    active: true,
  },
  {
    code: "FREESHIP",
    discountPercent: 0,
    minPurchase: 50,
    active: true,
  },
  {
    code: "SALE25",
    discountPercent: 25,
    minPurchase: 100,
    active: true,
  },
];

export const initialPromos = promoCodes;