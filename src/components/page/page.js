import styled from 'styled-components';
import background from '../../assets/images/background.png';
import MenuBarComponent from '../menubar/menubar';
import BottomNavigationComponent from './bottomNavigation';

const Page = styled.div`
    width: 100wh;
    height: 100vh;
    background-color: #282830;
    background: url(${background}) center no-repeat;
    color: rgba(255, 255, 255, 0.6);
    -webkit-app-region: drag;
    -webkit-user-select: none;
    user-select: none;

    & > * {
      -webkit-app-region: no-drag;
    }
`;

export default function PageComponent(props, { children }) {
  return (
    <Page>
      <MenuBarComponent />
      
      {props.children}

      <BottomNavigationComponent pageNumber={props.pageNumber}/>
    </Page>
)}