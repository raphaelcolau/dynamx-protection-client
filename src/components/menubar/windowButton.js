import styled from 'styled-components';

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

    &.CloseButton:last-child:hover {
        background-color: #ED4245;
    }
`;

export default WindowButton;