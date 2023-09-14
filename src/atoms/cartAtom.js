import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const cartListAtom = atom({
  key: "cartListAtom",
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

// 카트에서 선택된 아이템들 배열
export const cartCheckedItemsAtom = atom({
  key: "cartCheckedItemsAtom",
  default: [],
});
