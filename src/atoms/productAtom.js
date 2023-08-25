import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const productIdAtom = atom({
  key: "productIdAtom",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
