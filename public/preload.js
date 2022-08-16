const {ipcRenderer, contextBridge } = require("electron");

const API  = {
    register : (passwordObj) => ipcRenderer.invoke("register", passwordObj),
    isRegistered: (id) => ipcRenderer.invoke("isRegistered", id),
    saveCurrentPassword : (password) => ipcRenderer.send("saveCurrentPassword", password),
    getCurrentPassword : () => ipcRenderer.invoke("getCurrentPassword"),
    getAllPassword : () => ipcRenderer.invoke("getAllPassword"),
    getAppVersion : () => ipcRenderer.invoke("getAppVersion"),
    removePassword : (id) => ipcRenderer.invoke("removePassword", id)
    
}

contextBridge.exposeInMainWorld("Api", API);
