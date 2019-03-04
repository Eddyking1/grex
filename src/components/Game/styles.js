import styled from 'styled-components';
import {Map} from 'react-leaflet';

export const Wrapper = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-size: 1rem;

  button {
    background: var(--menu-color);
    width: 80%;
    font-size: 1.5em;
    padding: .8em;
    margin: .5em 0;
    border: .1em solid var(--nav-text-color);
    border-radius: 5px;
    color: var(--nav-text-color);
    outline: none;
    transition: .4s;
    cursor: pointer;
  }

  .Game-popup .leaflet-popup-content-wrapper {
    border-radius:0px;
    background-color:var(--nav-text-color);

  }
`;

export const PopupContent =  styled.div`
  background: var(--nav-text-color);
  text-align: center;

  span {
    font-size: 1.5em;
    font-weight: bold;
    color: white;
  }
`;

export const GameMap = styled(Map)`
  height: 100%;
  width: 100%;
`;
