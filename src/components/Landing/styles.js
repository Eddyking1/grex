import styled from "styled-components";

export const LandingPage = styled.div`
  display: flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-start;
  justify-items:center;
  width: 100vw;
  min-height: calc(100vh - 60px);
  background-color: var(--menu-color);



  button {
    padding: 0.5em 1em;
    margin: 4em 0;
    border: none;
    outline: none;
    background: var(--nav-text-color);
    color: white;
    font-size: 2em;
    font-weight: bold;
    border-radius: 0.1em;
    transition: transform 0.3s ease-in-out;
    
    &:hover {
      transform: scale(1.2);
    }

    @media screen and (max-width:700px) {
    margin: 2em 0em;
  }

  }

  p {
    padding: 1em 0 0;
    text-align: center;
    font-size: 1.5em;
    width:80vw;
  }

  h1 {
    height: 2em;
    text-align: center;
  }

img {
  min-width:200px;
  width: 30%;
  margin: 2em 2em;
}

`;

export const ButtonPos = styled.div`
 background-color: hsl(243, 66%, 72%);
 display:flex;
 justify-content:flex-end;
 flex-direction:column;
 
 padding:1em;
 width: 100vw;
 text-align:center;
 align-items:center;
 aling-content:center;
 vertical-align:middle;
 color:white;

  h2{
    font-size:2em;
  }

`;


export const LearnMoreInfo = styled.div `
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-start;
  justify-items:center;
  padding: 3em 2em;
  h2{
    font-weight:bold;
    font-size:2.5em;
    
  }

`;