import { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowIcon } from "../../../assets/svg/icon-up-arrow.svg";

export default function TopButton() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);
  return (
    <>
      {showButton && (
        <TopBtnBox>
          <button type="button" onClick={scrollToTop} aria-label="맨위로가기">
            <ArrowIcon stroke="white" />
          </button>
        </TopBtnBox>
      )}
    </>
  );
}

const TopBtnBox = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  transform: translate(-30px, -30px);
  button {
    width: 36px;
    height: 36px;
    background-color: #fff;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
    border-radius: 50%;
  }
  svg {
    stroke-width: 2;
  }
`;
