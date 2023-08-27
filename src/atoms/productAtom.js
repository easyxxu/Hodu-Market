import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const productIdAtom = atom({
  key: "productIdAtom",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
export const productAddFormAtom = atom({
  key: "productAddFrom",
  default: { product_id: "", quantity: 1, check: false },
  effects_UNSTABLE: [persistAtom],
});
