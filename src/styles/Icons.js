import styled from 'styled-components';
import {Menu} from 'styled-icons/material/Menu';
import {Cross} from 'styled-icons/icomoon/Cross'

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
