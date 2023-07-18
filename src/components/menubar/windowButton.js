import React from 'react';
import styled from 'styled-components';
const { ipcRenderer } = window.require('electron');

const WindowButton = styled.button`
    height: 100%;
    aspect-ratio: 1;
    background-color: #191924;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    --webkit-app-region: no-drag;
    --webkit-user-select: none;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);

    }

    &.button__close:hover {
        background-color: #ED4245;
    }
`;

export default function WindowButtons() {
    return (
        <div className='undraggable'>
            <WindowButton onClick={() => {
                ipcRenderer.send('window', 'minimize');
            }}>--</WindowButton>
            <WindowButton className='button__close' onClick={() => {
                ipcRenderer.send('window', 'close');
            }}>X</WindowButton>
        </div>
    );
}