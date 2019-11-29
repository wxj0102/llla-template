import { app, BrowserWindow, Menu, MenuItem, dialog } from'electron';
import { join } from 'path';
// import {ClassA} from'./a/ClassA';
let mainWindow:any;
let createWindow = function() {
    mainWindow = new BrowserWindow({
      width:800, 
      height:600, 
      fullscreenable:false,
      maximizable:false,
      backgroundColor:'#fff',
      webPreferences: {
        javascript: true,
        plugins: true,
        nodeIntegration: true, // 是否集成 Nodejs
        webSecurity: false,
        preload: join(__dirname, '../public/renderer.js') // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
    }
    })
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.on('closed', function() {
        mainWindow = null
    })
    // new ClassA()
}
app.on('ready', createWindow)
app.on('window-all-closed', ()=>{
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', ()=>{
   if (mainWindow === null) {
        createWindow()
    }
})