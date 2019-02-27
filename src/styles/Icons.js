import styled from 'styled-components';
import {Menu} from 'styled-icons/material/Menu';
import {Cross} from 'styled-icons/icomoon/Cross';
import {UserPlus} from 'styled-icons/icomoon/UserPlus';
import {DoorOpen} from 'styled-icons/fa-solid/DoorOpen';



export const HamburgerMenu = styled(Menu)`
  color: var(--nav-text-color);
  height: 3rem;
  width: 3rem;
`;

export const NavCross = styled(Cross)`
  color: var(--nav-text-color);
  height: 2rem;
  width: 2rem;
`;

export const SignUpIcon = styled(UserPlus)`
  color: var(--nav-text-color);
  height: 5rem;
  width: 5rem;
  margin:1em;
`;

export const LoginIcon = styled(DoorOpen)`
  color: var(--nav-text-color);
  height: 5rem;
  width: 5rem;
  margin:1em;
`;
