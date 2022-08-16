const { app, BrowserWindow, ipcMain} = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')
const Store = require('electron-store');
const nanoId = require('nano-id');

//defined the store
let store = new Store({encryptionKey: 'qlcrpBtrW53o1u'});
require('@electron/remote/main').initialize()

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 650,
    height: 700,
    maxWidth: 800,
    maxHeight: 1000,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: true,
      preload: `${path.join(__dirname, '../public/preload.js')}`,
    }
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
 
}

app.on('ready', createWindow)

ipcMain.handle('register', (event, arg) => {
  id = nanoId(14)
  let newArg = {...arg, id: id}
  console.log("Register !", newArg, );
  try {
    store.set(`User.${id}`, newArg);
    console.log("register successfully !")
    return {"id": id}
  } catch (error) {
    console.error(error)
  } 
});
ipcMain.handle('isRegistered', async (event, id) => {
  return store.get(`User.${id}`, {
    username: "", password: "", website: "", id: "",
  });
});

ipcMain.on('saveCurrentPassword', (event, pw) => {
  store.set("Temp.cPassword", pw);
});

ipcMain.handle('getCurrentPassword', async (event, arg) => {
  return store.get("Temp.cPassword", "")
});

ipcMain.handle('getAllPassword', async (event, arg) => {
  return store.get("User")
});

ipcMain.handle("removePassword", async (event, id) => {
  store.delete("User."+id)
  return { ok: !store.has("User."+id)}
});

ipcMain.handle("getAppVersion", async (event, id) => {
  console.log("App Version :", app.getVersion())
  return app.getVersion();
});





// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})



app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})