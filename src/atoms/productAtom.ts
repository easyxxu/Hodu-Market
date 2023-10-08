import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const productIdAtom = atom<number>({
  key: "productIdAtom",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
