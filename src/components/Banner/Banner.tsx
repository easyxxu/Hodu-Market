import { useRef, useState, useEffect } from "react";
import * as S from "./BannerStyle";
import bannerImg2 from "../../assets/img/banner2.jpg";
import bannerImg2Lg from "../../assets/img/banner2_lg.webp";
import bannerImg2Md from "../../assets/img/banner2_md.webp";
import bannerImg2Sm from "../../assets/img/banner2_sm.webp";
import bannerImg3 from "../../assets/img/banner3.jpg";
import bannerImg3Lg from "../../assets/img/banner3_lg.webp";
import bannerImg3Md from "../../assets/img/banner3_md.webp";
import bannerImg3Sm from "../../assets/img/banner3_sm.webp";
import bannerImg4 from "../../assets/img/banner4.jpg";
import bannerImg4Lg from "../../assets/img/banner4_lg.webp";
import bannerImg4Md from "../../assets/img/banner4_md.webp";
import bannerImg4Sm from "../../assets/img/banner4_sm.webp";

const banner1ImgLgSrc = `${process.env.PUBLIC_URL}/img/banner1_lg.webp`;
const banner1ImgMdSrc = `${process.env.PUBLIC_URL}/img/banner1_md.webp`;
const banner1ImgSmSrc = `${process.env.PUBLIC_URL}/img/banner1_sm.webp`;
const banner1ImgSrc = `${process.env.PUBLIC_URL}/img/banner1.jpg`;
const imgArr = [banner1ImgSrc, bannerImg2, bannerImg3, bannerImg4];
const imgArrLg = [banner1ImgLgSrc, bannerImg2Lg, bannerImg3Lg, bannerImg4Lg];
const imgArrMd = [banner1ImgMdSrc, bannerImg2Md, bannerImg3Md, bannerImg4Md];
const imgArrSm = [banner1ImgSmSrc, bannerImg2Sm, bannerImg3Sm, bannerImg4Sm];

export default function Banner() {
  const swiperRef = useRef<any>(null);
  const [swiperCurrentPosition, setSwiperCurrentPosition] = useState(0);
  const [loop, setLoop] = useState<any>(false);
  const Total_Slides = imgArrMd.length - 1;

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
    swiperRef.current.style.width = `${imgArrMd.length}00vw`;
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
        ? `translate(0vw)`
        : `translate(-${swiperCurrentPosition}00vw)`;
  }, [swiperCurrentPosition]);

  return (
    <S.BannerContainer>
      <S.BannerImgContainer ref={swiperRef}>
        {imgArr.map((img, idx) => (
          <picture key={idx}>
            <source
              srcSet={`${imgArrSm[idx]} 609w, ${imgArrMd[idx]} 1280w, ${imgArrLg[idx]} 1920w`}
              type="image/webp"
            />
            <img
              key={idx}
              src={img}
              alt={`배너이미지${idx + 1}`}
              fetchpriority={idx === 0 ? "high" : "low"}
              className={swiperCurrentPosition === idx ? "active" : ""}
            />
          </picture>
        ))}
      </S.BannerImgContainer>
      <S.BannerLeftBtn
        type="button"
        aria-label="왼쪽 배너 버튼"
        onClick={prevSlide}
      />
      <S.BannerRightBtn
        type="button"
        aria-label="오른쪽 배너 버튼"
        onClick={nextSlide}
      />
    </S.BannerContainer>
  );
}
