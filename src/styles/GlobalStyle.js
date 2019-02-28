import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`

  :root {
    --menu-color: hsl(231, 74%, 11%);
    --nav-text-color: hsl(243, 100%, 69%);

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
    background: var(--menu-color);
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

  span {
    color:var(--nav-text-color)
  }

`;

const FormStyle = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(80vh - 60px);
  background-color: var(--menu-color);
  margin: 0;
  padding: 1em 0.2em;

  form {
    display: flex;
    justify-content:center;
    align-items:center;
    align-content:center;
    flex-direction: column;
  }
  input {
    font-size: 1.5em;
    color: white;
    border: none;
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    background-image: none;
    background-color: transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    text-align: center;
    padding: 1em;
    margin: 0.5em 0;
    outline: none;
  }
  
  input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: 1px solid var(--nav-text-color);
  -webkit-text-fill-color: var(--nav-text-color);
  -webkit-box-shadow: 0 0 0px 1000px #000 inset;
  transition: background-color 5000s ease-in-out 0s;
}
  input::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
    opacity: 1; /* Firefox */
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline-offset: 0px !important;
  }

  button {
    padding: 0.5em 1.5em;
    margin: 2em 0;
    border: none;
    outline: none;
    background: var(--nav-text-color);
    color: white;
    font-size: 2em;
    font-weight: bold;
    border-radius: 0.1em;
  }

  h1 {
    height: 2em;
    text-align: center;
  }

  p {
    padding: 1em 0 0;
    text-align: center;
    font-size: 1.2em;
  }

  @media screen and (max-width: 600px) {
  }
`;

export { GlobalStyle, FormStyle };
