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
    --content-color-dark: #767676;
    --content-color-light: #c4c4c4;
    --price-point-color: #eb5757;
    --point-color: #21bf48;
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
    font-weight: 400;
    border: 0;
    cursor: pointer;
    color: inherit;
    padding: 0;
    background-color: inherit;
    &:disabled{cursor: default}
  }
  input{
    border: 0;
    -webkit-appearance: none;
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
