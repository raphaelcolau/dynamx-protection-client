import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/head-logo.png';
import WindowButtons from './windowButton';

const MenuBar = styled.div`
    width: 100wh;
    height: 25px;
    overflow: hidden;
    background-color: #191924;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    --webkit-app-region: drag;
    --webkit-user-select: none;

    & img {
        height: 90%;
        width: auto;
        margin-left: 0.5rem;
        user-select: none;
    }
`;

export default function MenuBarComponent() {

  return (
    <MenuBar>
        <img src={logo} alt="dynamx logo" draggable="false"/>
        <WindowButtons />
    </MenuBar>
  );
}