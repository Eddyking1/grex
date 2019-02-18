import styled from 'styled-components';
import {KeyFrameSidebar, KeyFrameSidebarIn, KeyFrameSidebarFade} from '../../styles/Keyframes';

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
  font-size: 1rem;
  color: var(--nav-text-color);
  z-index: 10000;

  button {
    background: none;
    border: none;
    outline: none;
    padding: 20px;
    cursor: pointer;
  }
`;

export const Overlay = styled.aside`
  min-height: 100vh;
  background-color: var(--menu-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  width: 25%;
  z-index: 1000;

  @media (max-width: 1100px) {
    width: 100%;
  }

  ${props => !props.open} {
    animation: ${ KeyFrameSidebar } .6s forwards;
  }

  ${props => props.open} {
    animation: ${ KeyFrameSidebarIn } .6s forwards;
    pointer-events: none;
  }

  ul {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;

    img {
      width: 110px;
      padding: 0 0 20px;
    }

    li {
      width: 80%;
      min-width: 200px;

      h3 {
        color: white;
      }

      a {
        display: block;
        padding: 20px;
        font-size: 2.5em;
        color: #d8e6f7;
        border-bottom: 2px solid #001D34;
        margin: 10px 0;
        transition: .4s;

        :hover {
          border-bottom: 2px solid var(--nav-text-color);
          transition: .4s;
          transform: scale(1.05);
        }
      }
    }
  }
`;

export const NavigationExit = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  transition: .4s;
  margin: 0 0;
  padding: 0 0;

  :hover {
    transition: .4s;
    transform: scale(1.1);
  }
`;

export const Sidebar = styled.div`
  width: 100%;
  min-height: 100vh;
  top: 0;
  position: absolute;
  background-color: rgba(7,14,49,.2);

  ${props => props.open === true} {
    animation: ${KeyFrameSidebarFade} .6s forwards;
  }
`;
