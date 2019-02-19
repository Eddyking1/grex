import styled from 'styled-components';
import {Map} from 'react-leaflet';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
`;

export const GameMap = styled(Map)`
  height: calc(100vh - 100px);
  width: 100%;
`;
