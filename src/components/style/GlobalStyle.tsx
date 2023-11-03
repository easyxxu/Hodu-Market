import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import SpoqaHanSansNeoRegular from "../style/fonts/SpoqaHanSansNeo-Regular.ttf";
import SpoqaHanSansNeoMedium from "../style/fonts/SpoqaHanSansNeo-Medium.ttf";
import SpoqaHanSansNeoBold from "../style/fonts/SpoqaHanSansNeo-Bold.ttf";
export const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
  font-family: 'Spoqa Han Sans Neo';
  src: url(${SpoqaHanSansNeoRegular});
  font-weight: 400;
  }

  @font-face {
    font-family: 'Spoqa Han Sans Neo';
    src: url(${SpoqaHanSansNeoMedium});
    font-weight: 500;
  }

  @font-face {
    font-family: 'Spoqa Han Sans Neo';
    src: url(${SpoqaHanSansNeoBold});
    font-weight: 700;
  }
  :root{
    // color variables
    --content-color-dark: #767676;
    --content-color-dark-hover: #4f4f4f;
    --content-color-light: #c4c4c4;
    --price-point-color: #eb5757;
    --point-color: #21bf48;
    --color-white: #fff;
    --color-black: #000;

    // font size variables
    --font-lg: 24px;
    --font-md: 18px;
    --font-sm: 16px;
  }
  *{
    box-sizing: border-box;
  }
  body {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 400;
  }
  a{
    font-family: 'Spoqa Han Sans Neo';    
    font-weight: 400;
    color: inherit;
    text-decoration: none;
  }
  textarea{
    font-family: 'Spoqa Han Sans Neo';    
  }
  button{
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 500;
    border: 0;
    cursor: pointer;
    color: inherit;
    padding: 0;
    background-color: inherit;
    &:disabled{cursor: not-allowed}
  }
  input{
    border: 0;
    /* -webkit-appearance: none; */
    border-radius: 0;
    &:focus{
      outline: none;
    }
  }
  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
  `;
