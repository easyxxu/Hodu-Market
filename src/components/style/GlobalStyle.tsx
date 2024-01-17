import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  :root{
    --content-color-dark: #767676;
    --content-color-dark-hover: #4f4f4f;
    --content-color-light: #c4c4c4;
    --price-point-color: #eb5757;
    --point-color: #21bf48;
    --color-white: #fff;
    --color-black: #000;

    --font-lg: 24px;
    --font-md: 18px;
    --font-sm: 16px;
  }

  *,*::before, *::after{
		box-sizing: border-box;
    font-family: 'Spoqa Han Sans Neo'; 
	}

  html, body, div, span, h1, h2, h3, h4, h5, h6, p, strong,
	a, dl, dt, dd, ol, ul, li, form, label, table, input, button, textarea{
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 400;
  }

  a{
    color: inherit;
    text-decoration: none;
  }

  button{
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
