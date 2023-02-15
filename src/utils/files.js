const { ipcMain, shell } = require("electron")

exports.browserUrl = () => {
    ipcMain.on("browser-url", (event, arg) => {
        const url = arg;
        console.log(typeof url);
        if (url.startsWith("//")) {
            shell.openExternal(`http:${url}`)
        } else {
            shell.openExternal(url)
        }
        return { action: 'deny' };
    })
}