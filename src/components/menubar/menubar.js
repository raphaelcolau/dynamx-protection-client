import React from 'react';
import logo from '../../assets/images/head-logo.png';
import WindowButtons from './windowButton';

// Path: src\components\menubar.js
const styleMenuBar = {
    width: '100wh',
    height: '25px',
    overflow: "hidden",
    backgroundColor: '#191924',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '--webkit-app-region': 'drag',
    '--webkit-user-select': 'none',

    '&.MenuBar__logo': {
        height: '100%',
        width: 'auto',
    }
};




export default function MenuBar() {

  return (
    <div className="MenuBar draggable" style={styleMenuBar}>
        <div className="MenuBar__logo">
            <img src={logo} alt="dynamx logo" />
        </div>
        <div className="MenuBar__button">
            <WindowButtons />
        </div>
    </div>
  );
}