import styled from "styled-components";

export const SignInUp = styled.div`
  display: flex;
  justify-content:center;
  align-content:center;
  background-color: hsl(225, 70%, 5%);
  font-family: "System76 Fira Sans", "Fira Sans", sans-serif;
  min-height: 100vh;
  width:100vw;
  margin:0 auto;
  padding-top:100px;
  overflow-x: none;

  form {
    padding:20px;
    height: 20%;
    width: 50vw;
    background-color: hsl(225, 70%, 5%);
    justify-content: center;
    margin: 0 auto;
    border: 2px solid green;

    @media screen and (max-width: 600px) {
      width:90vw;
  }
  }
  input {
    margin:0 auto;
    display: flex;
    padding: 12px 20px;
    box-sizing: border-box;
  }

  button {
    margin: 10% 25%;
    padding:10px;
    width: 50%;
    height: 5vh;
  }

  h1{
    text-align:center;
    padding:10px;
  }
`;
