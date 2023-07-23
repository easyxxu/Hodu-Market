import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    font-family: 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif;
    box-sizing: border-box;
  }
  a{
    font-family: 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif;
    color: inherit;
    text-decoration: none;
  }
  button{
    font-family: 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif;
    border: 0;
    cursor: pointer;
    padding: 0;
    background-color: inherit;
  }
  input{
    border: 0;
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
  `;
