import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const cartItemAtom = atom({
  key: "cartItemAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const cartInfoAtom = atom({
  key: "cartInfoAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const cartTotalAtom = atom({
  key: "cartTotalAtom",
  default: { total: [], shippingFee: [] },
  // effect_UNSTABLE: [persistAtom],
});

export const cartCheckedItemsAtom = atom({
  key: "cartCheckedItemsAtom",
  default: [],
});
