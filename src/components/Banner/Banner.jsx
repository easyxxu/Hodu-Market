import React from "react";
import { BannerContainer, BannerLeftBtn, BannerRightBtn } from "./BannerStyle";

export default function Banner() {
  return (
    <BannerContainer>
      <BannerLeftBtn type="button"></BannerLeftBtn>
      <BannerRightBtn type="button"></BannerRightBtn>
    </BannerContainer>
  );
}
