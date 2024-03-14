import * as S from "./CartHeaderStyle";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cartProductInfoListAtom,
  cartCheckedItemsAtom,
} from "../../atoms/cartAtom";

export default function CartHeader() {
  const cartProductInfoList = useRecoilValue(cartProductInfoListAtom);
  const [cartCheckedItems, setCartCheckItems] =
    useRecoilState(cartCheckedItemsAtom);

  const idArr: number[] = [];
  const handleAllSelect = (checked: boolean) => {
    if (checked) {
      cartProductInfoList.forEach(
        (cartItem: { data: { product_id: number } }) =>
          idArr.push(cartItem.data.product_id)
      );
      setCartCheckItems(idArr);
    } else {
      setCartCheckItems([]);
    }
  };

  return (
    <S.CartHeader>
      <tr>
        <th>
          <S.CartCheckBox
            type="checkbox"
            onChange={(e) => handleAllSelect(e.target.checked)}
            checked={
              cartCheckedItems.length === cartProductInfoList.length
                ? true
                : false
            }
          />
        </th>
        <th>상품정보</th>
        <th>수량</th>
        <th>상품금액</th>
        <th></th>
      </tr>
    </S.CartHeader>
  );
}
