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

@font-face {
    font-family: 'NEXON Lv2 Gothic';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv2 Gothic.woff') format('woff');
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
    font-family: "NEXON Lv2 Gothic";
    line-height: 1;
    background: #fff;
    section {
      padding-top: 60px;
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
