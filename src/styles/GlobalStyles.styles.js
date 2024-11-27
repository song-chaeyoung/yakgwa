import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SDSamliphopangche_Outline';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Outline.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
  @font-face {
    font-family: 'SDSamliphopangche_Basic';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Basic.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  @import url("https://fonts.googleapis.com/earlyaccess/notosanskr.css");

  ${reset}

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul, li {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input {
    &:focus {
      outline: none;
    }
  }

  html {
    font-size: 15px;
  }

  body {
    font-family: "Noto Sans KR";
    line-height: 1;
    /* height: 2000px; */
    background: #fff;
    /* font-size: 14px; */
    section {
      padding-top: 60px;
  /* padding: 4rem 1.5rem 6rem; */

      /* padding: 0 10px; */
      /* padding: 60px 10px 0; */
    }

  }


  :root {
    --main-color: #3E8AFA;
    --point-yellow : #FED543;
    --main-gray: #666666;
    --main-light-gray: #efefef;
    --SD-Basic : 'SDSamliphopangche_Basic';
    --SD-Outline : 'SDSamliphopangche_Outline';
  }
`;
