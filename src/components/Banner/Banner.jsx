import React from "react";
import { BannerContainer, BannerLeftBtn, BannerRightBtn } from "./BannerStyle";

export default function Banner() {
  return (
    <BannerContainer>
      <BannerLeftBtn type="button" aria-label="왼쪽 배너 버튼"></BannerLeftBtn>
      <BannerRightBtn
        type="button"
        aria-label="오른쪽 배너 버튼"
      ></BannerRightBtn>
    </BannerContainer>
  );
}
