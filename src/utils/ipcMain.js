const {ipcMain} = require('electron');

exports.WindowListener = () =>  {
    ipcMain.on('window', (event, arg) => {
        switch (arg) {
            case 'minimize':
                event.sender.getOwnerBrowserWindow().minimize();
                break;
            case 'maximize':
                event.sender.getOwnerBrowserWindow().maximize();
                break;
            case 'unmaximize':
                event.sender.getOwnerBrowserWindow().unmaximize();
                break;
            case 'close':
                event.sender.getOwnerBrowserWindow().close();
                break;
            default:
                break;
        }
    });
}