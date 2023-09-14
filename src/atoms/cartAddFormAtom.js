import { atom } from "recoil";

export const cartAddFormAtom = atom({
  key: "cartAddFormAtom",
  default: {
    product_id: "",
    quantity: 1,
    check: false,
  },
});
