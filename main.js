'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


let mainWindow;


function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        resizable: true,
        center: true,
        show: true,
        frame: true,
        autoHideMenuBar: true,
        icon: 'icon.png',
        'web-preferences': {
            javascript: true,
            plugins: true,
            nodeIntegration: false,
            webSecurity: false,
            preload: __dirname + '/preload.js'
        }
    });

    // and load the index.html of the app.
    //mainWindow.webContents.openDevTools();
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.on('closed', function() {
      mainWindow = null;
    });
  }
  app.on('ready', createWindow);

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', function () {
    if (mainWindow === null) {
      createWindow();
    }
  });
