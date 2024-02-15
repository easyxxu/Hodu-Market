import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { media } from "../style/media";
interface Props {
  imgSrc: string;
  alt: string;
}
const defaultOption = {
  root: null,
  threshold: 0,
  rootMargin: "0px",
};
export default function ProductImg({ imgSrc, alt }: Props) {
  const [loading, setLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const checkIntersect = ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLImageElement;
        target.setAttribute("src", imgSrc);
        io.unobserve(target);
      }
    };

    const io = new IntersectionObserver(checkIntersect, {
      ...defaultOption,
    });
    if (imgRef.current) {
      io.observe(imgRef.current);
    }

    return () => io && io.disconnect();
  }, [imgRef]);

  return (
    <ProductImgWrap
      data-src={imgSrc}
      alt={alt}
      ref={imgRef}
      onLoad={() => setLoading(false)}
      className={loading ? "loading" : "loaded"}
    />
  );
}

const ProductImgWrap = styled.img`
  width: 100%;
  height: 350px;
  border-radius: 10px;
  border: 1px solid #c4c4c4;
  margin-bottom: 6px;
  object-fit: cover;

  ${media.Medium`
    height: 250px;
  `}
  ${media.Small`
    height: 90px;
  `}
  &.loading {
    filter: blur(6px);
    clip-path: inset(0);
  }
  &.loaded {
    filter: blur(0px);
  }
`;
