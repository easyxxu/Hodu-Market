import { useCallback } from "react";
import { atom, useRecoilState } from "recoil";

const modalsAtom = atom({
  // 모달 컴포넌트들을 상태값으로 보관
  key: "modalOpenAtom",
  default: [],
});
export default function useModal() {
  const [modals, setModals] = useRecoilState(modalsAtom);
  const openModal = useCallback(
    (Component, props) => {
      setModals([...modals, { Component, props: { ...props, open: true } }]);
    },
    [setModals]
  );

  const closeModal = useCallback(
    (type) => {
      setModals((modals) => modals.filter((modal) => modal.Component !== type));
    },
    [setModals]
  );
  return { modals, openModal, closeModal };
}
