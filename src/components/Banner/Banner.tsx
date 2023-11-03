import React, { useRef, useState } from "react";
import * as S from "./BannerStyle";
import bannerImg1 from "../../assets/img/banner_product1.jpg";
import bannerImg2 from "../../assets/img/banner_product2.jpg";
import bannerImg3 from "../../assets/img/banner_product3.jpg";
import bannerImg4 from "../../assets/img/banner_product4.jpg";
import bannerImg5 from "../../assets/img/banner_product5.jpg";
import { useEffect } from "react";
export default function Banner() {
  const imgArr = [bannerImg1, bannerImg2, bannerImg3, bannerImg4, bannerImg5];
  const swiperRef = useRef<any>(null);
  const [swiperCurrentPosition, setSwiperCurrentPosition] = useState(0);
  const [loop, setLoop] = useState<any>(false);
  const Total_Slides = imgArr.length - 1;
  const nextSlide = () => {
    setSwiperCurrentPosition((prev) => {
      if (prev < Total_Slides) {
        return prev + 1;
      } else return 0;
    });
  };
  const prevSlide = () => {
    setSwiperCurrentPosition((prev) => {
      if (prev === 0) {
        return Total_Slides;
      } else {
        return prev - 1;
      }
    });
  };
  useEffect(() => {
    swiperRef.current.style.width = imgArr ? `${imgArr.length}00vw` : "0";
  }, []);

  useEffect(() => {
    const swiperLoop = setTimeout(() => {
      nextSlide();
    }, 5000); // 배너 속도 조절
    setLoop(swiperLoop);
    return () => clearTimeout(loop);
  }, [swiperCurrentPosition]);

  useEffect(() => {
    swiperRef.current.style.transform =
      swiperCurrentPosition === 0
        ? `translate(000vw)`
        : `translate(-${swiperCurrentPosition}00vw)`;
  }, [swiperCurrentPosition]);

  return (
    <S.BannerContainer>
      <S.BannerImgContainer ref={swiperRef}>
        {imgArr.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="배너이미지"
            className={swiperCurrentPosition === idx ? "active" : ""}
          />
        ))}
      </S.BannerImgContainer>
      <S.BannerLeftBtn
        type="button"
        aria-label="왼쪽 배너 버튼"
        onClick={prevSlide}
      ></S.BannerLeftBtn>
      <S.BannerRightBtn
        type="button"
        aria-label="오른쪽 배너 버튼"
        onClick={nextSlide}
      ></S.BannerRightBtn>
    </S.BannerContainer>
  );
}
