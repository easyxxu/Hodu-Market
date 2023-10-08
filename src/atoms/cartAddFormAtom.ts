import { atom } from "recoil";

interface CartAddFormTypes {
  product_id: number;
  quantity: number;
  check: boolean;
}

export const cartAddFormAtom = atom<CartAddFormTypes>({
  key: "cartAddFormAtom",
  default: {
    product_id: 0,
    quantity: 1,
    check: false,
  },
});
