import { atom } from "recoil";

export const quantityAtom = atom<number>({
  key: "quantityAtom",
  default: 1,
});
