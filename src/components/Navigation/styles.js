import styled from 'styled-components';
import {KeyFrameSidebar} from '../../styles/Keyframes';

export const Navbar = styled.div`
  background: var(--menu-color);
  height: 100px;
  border: none;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: baseline;
  align-content: center;
  align-items: center;

  button {
    background: none;
    border: none;
    outline: none;
    padding: 20px;
    cursor: pointer;
  }
`;

export const Sidebar = styled.div`
  animation: ${KeyFrameSidebar} .4s ease-in-out;
  position: absolute;
  top: 100px;
  min-height: 100vh;
  width: 30%;
  display: ${props => props.open ? "flex" : "none"};
  background-color: white;
`;
