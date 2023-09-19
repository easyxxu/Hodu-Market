import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const cartProductInfoListAtom = atom<any[]>({
  key: "cartProductInfoListAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const cartInfoListAtom = atom<any[]>({
  key: "cartInfoListAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
interface cartTotalTypes {
  total: number[];
  shippingFee: number[];
}
export const cartTotalAtom = atom<cartTotalTypes>({
  key: "cartTotalAtom",
  default: { total: [], shippingFee: [] },
  // effect_UNSTABLE: [persistAtom],
});

// 카트에서 선택된 아이템들 배열
export const cartCheckedItemsAtom = atom<number[]>({
  key: "cartCheckedItemsAtom",
  default: [],
});
