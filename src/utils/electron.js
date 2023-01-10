const {app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { WindowListener } = require('./ipcMain');

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    movable: true,
    resizable: true,
    frame: true,
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, '../public/logo512.png'),
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

  
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

WindowListener();