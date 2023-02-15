const { ipcMain, shell } = require("electron")

exports.browserUrl = () => {
    ipcMain.on("browser-url", (event, arg) => {
        shell.openExternal(arg)
        return { action: 'deny' };
    })
}