import React from "react";
import DaumPostCode from "react-daum-postcode";
import { CSSProperties } from "styled-components";
interface Address {
  우편번호: string;
  기본주소: string;
  상세주소: string;
}

interface PostCodeProps {
  address: Address;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
  setPostCodeModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const PostCode = ({ address, setAddress, setPostCodeModal }: PostCodeProps) => {
  const handleComplete = (data: any) => {
    // console.log(data);
    setAddress({
      ...address,
      우편번호: data.zonecode,
      기본주소: data.roadAddress,
    });
    setPostCodeModal(false);
  };
  const postCodeStyle: CSSProperties = {
    display: "block",
    position: "absolute",
    width: "50%",
    height: "50%",
    top: "0",
    left: "0",
    transform: "translate(50%, 50%)",
    zIndex: 100,
  };
  return <DaumPostCode style={postCodeStyle} onComplete={handleComplete} />;
};

export default PostCode;
