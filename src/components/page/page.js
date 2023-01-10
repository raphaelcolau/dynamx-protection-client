import styled from 'styled-components';
import background from '../../assets/images/background.png';
import MenuBarComponent from '../menubar/menubar';

const Page = styled.div`
    width: 100wh;
    height: 100vh;
    background-color: #282830;
    background: url(${background}) center no-repeat;
    color: rgba(255, 255, 255, 0.6);
    -webkit-app-region: drag;
    -webkit-user-select: none;
    user-select: none;
`;

export default function PageComponent({ children }) {
  return (
    <Page>
      <MenuBarComponent />
      {children}
    </Page>
)}