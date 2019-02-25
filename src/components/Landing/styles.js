import styled from "styled-components";

export const LandUp = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  flex-wrap: wrap;
  button {
    display: inline-block;
    background-color: var(--nav-text-color);
    align-content: center;
    margin: 0 10px 10px;
    font-size: 1.5em;
    text-decoration: none;

    a {
      width: 100vw;
      border: none;
      text-decoration: none;
      margin: 0 auto;
    }
    a:hover {
      border: none;
    }
  }
`;

export const LandingPage = styled.div`
  background-color: var(--menu-color);
  font-family: "System76 Fira Sans", "Fira Sans", sans-serif;
  min-height: 100vh;

  h1 {
    font-size: 3em;
    text-align: center;
    color: var(--nav-text-color);
    padding: 40px;
    font-family: "Roboto", sans-serif;
  }

  h2 {
    font-size: 2em;
    text-align: center;
  }
  ul {
    width: 60vw;
    padding: 10px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    text-align: left;
    position: relative;
  }

  li {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    align-content: center;
    justify-content: center;
    align-items: center;
    min-width: 100vw;
    padding: 10px;
  }

  p {
    font-size: 1.8em;
    font-weight: bold;
  }

  img {
    width: 100px;
    padding: 0 10px 20px;
  }

  a {
    display: block;
    padding: 20px;
    font-size: 2.5em;
    border-bottom: 2px solid #001d34;
    margin: 10px 0;
    transition: 0.4s;

    :hover {
      border-bottom: 2px solid var(--nav-text-color);
      transition: 0.4s;
      transform: scale(1.05);
    }
  }
`;