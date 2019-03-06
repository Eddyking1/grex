import styled from 'styled-components';

export const Chat = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items:center;
  align-content: center;
  align-items: center;
  min-height: 50vh;
  
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
    padding: 0.85em;
    margin: 0;
    outline: none;
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

  h2 {
  width:100%;
  margin:10px;
  padding:10px 0px;
  background-color:var(--nav-text-color);
  color: white;
  border: 1px solid var(--nav-text-color);
  text-align:center;

  }
`;

export const ChatList = styled.div`
  display:flex;
  color:var(--nav-text-color);
  height:200px;
  padding:10px;
  min-width:70%;
  max-width:90%;
  border:1px solid;
  flex-direction:column;
  overflow-y:scroll;
  overflow-x:none;
  font-size:1.2em;


 strong {
   color:white;
   text-align:left;
 }
 
  li {
    text-align:left;
    
    padding: 5px 0 5px;

    span {
      display:block;
      text-align:left;
      overflow:none;
      width:100%;
      border-bottom:1px solid rgba(255, 255, 255, 0.5);
      color:var(--toolbar-color);
      &:hover {
        transform: scale(1);
      }
    }
  }


`;
