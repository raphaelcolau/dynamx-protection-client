import styled from 'styled-components';
import background from '../../assets/images/background.png';

const Page = styled.div`
    width: 100wh;
    height: 100vh;
    background-color: #282830;
    background: url(${background}) center no-repeat;
    --webkit-app-region: drag;
    --webkit-user-select: none;
`;

export default function PageComponent({ children }) {
  return <Page>{children}</Page>;
}