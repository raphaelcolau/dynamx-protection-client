const {app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { WindowListener } = require('./ipcMain');
const { browserUrl } = require('./files');

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    movable: true,
    resizable: true,
    frame: true,
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, '../../public/logo192.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  
  // Open the DevTools.
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// ipcMain listener for window buttons
WindowListener();

// ipcMain listener for browser url
browserUrl();