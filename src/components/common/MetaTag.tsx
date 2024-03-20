import { Helmet } from "react-helmet-async";

interface MetaTagProps {
  title?: string;
  description?: string;
  imgSrc?: string;
  url?: string;
}

const DEPLOY_URL = "https://effervescent-liger-740f87.netlify.app";

export default function MetaTag(props: MetaTagProps) {
  const url = props.url ? `${DEPLOY_URL}${props.url}` : DEPLOY_URL;

  return (
    <Helmet>
      <title>
        {(props.title && `Hodu Market - ${props.title}`) || "Hodu Market"}
      </title>
      <meta
        name="description"
        content={
          props.description ||
          "상품을 등록하고 관리할 수 있으며, 구매도 가능한 오픈마켓입니다:)"
        }
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title || "Hodu Market"} />
      <meta property="og:site_name" content="Hodu Market" />
      <meta
        property="og:description"
        content={
          props.description ||
          "상품을 등록하고 관리할 수 있으며, 구매도 가능한 오픈마켓입니다:)"
        }
      />
      <meta
        property="og:image"
        content={
          props.imgSrc ||
          "https://github.com/easyxxu/Hodu-Market/blob/main/src/assets/img/HoduMarket.png?raw=true"
        }
      />
      <meta property="og:url" content={url} />
    </Helmet>
  );
}
