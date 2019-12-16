import { app, BrowserWindow, Menu, MenuItem, dialog } from 'electron';
import { join } from 'path';
import { IpcEvent, eventList, IpcEventItem } from './events';
import workEventList from './modules/work';

const events:IpcEventItem[] = [...eventList, ...workEventList]

let mainWindow: any;

const ipcEvent: IpcEvent = new IpcEvent();
ipcEvent.init(events);
ipcEvent.listen();

let createWindow = function () {
  console.log('start electron')
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreenable: false,
    maximizable: false,
    backgroundColor: '#fff',
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: true, // 是否集成 Nodejs
      webSecurity: false,
      preload: join(__dirname, '../preload.js') // 但预加载的 js 文件内仍可以使用 Nodejs 的 API, 路径是相对于那边的
    }
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL('http://localhost:3000')
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
