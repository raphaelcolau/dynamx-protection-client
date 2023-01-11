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
    -webkit-app-region: drag !important; //!important is needed to override the -webkit-app-region: no-drag from the parent on his children (page.js)
    -webkit-user-select: none;
    user-select: none;

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