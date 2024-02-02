import React, { useCallback } from "react";
import { atom, useRecoilState } from "recoil";

interface ModalItems {
  Component: React.ComponentType<any>;
  props: any;
}
const modalsAtom = atom<ModalItems[]>({
  // 모달 컴포넌트들을 상태값으로 보관
  key: "modalOpenAtom",
  default: [],
});
export default function useModal() {
  const [modals, setModals] = useRecoilState<ModalItems[]>(modalsAtom);
  const openModal = useCallback(
    (Component: React.ComponentType<any>, props?: any) => {
      setModals([...modals, { Component, props: { ...props } }]);
    },
    [setModals]
  );

  const closeModal = useCallback(
    (type: React.ComponentType<any>) => {
      setModals((modals) => modals.filter((modal) => modal.Component !== type));
    },
    [setModals]
  );
  return { modals, openModal, closeModal };
}
