// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');

const FRAME_RESIZABLE_W = 18;
const FRAME_RESIZABLE_H = 40;

const FRAME_STATIC_W = 8;
const FRAME_STATIC_H = 30;

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800 + FRAME_RESIZABLE_W,
    height: 600 + FRAME_RESIZABLE_H,
    frame: true,
    icon: path.resolve("./www/favicon.ico"),
    resizable: false,
    //title: "[Window]",
    //simpleFullscreen: true,
    //fullscreenable: true,
    //webPreferences: {
    //  nodeIntegration: true
    //}
  });
  
  mainWindow.menuBarVisible = false; // Hides menu bar.

  mainWindow.loadFile('./www/index.html');
  //mainWindow.loadURL('http://127.0.0.1:8888');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
