import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  :root {
    --menu-color: hsl(231, 74%, 11%);
    --nav-text-color: hsl(151, 89%, 49%);

    --search-field: hsl(220, 7%, 17%);
    --highlight-color: hsl(220, 7%, 27%);
    --toolbar-color: hsl(0, 0%, 98%);
    --accent-color: hsl(227, 58%, 65%);
    --remove-color: hsl(0, 38%, 50%);
    --remove-color-highlight: hsl(0, 49%, 70%);
    --offwhite: hsl(192, 15%, 94%);
    --muted: hsl(240, 0%, 46%);
    --favourite: hsl(51, 95%, 58%);
  }

  body {
    width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background: #e0f8f7;
    color: white;
  }

  * {
    box-sizing: border-box;
    padding: 0rem;
    margin: 0rem;
    font-family: sans-serif;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: white;
  }
`;

export default GlobalStyle;
