"use strict";

let menuHandler = {};

menuHandler.create = () => {
  let remote = require('remote');
  let Menu = remote.require('menu');
  let shell = require('shell');
  let updateTool = require('./update.js');
  let MenuItem = remote.MenuItem;
  let template = [
    {
      label: 'free-programming-books',
      submenu: [
        {
          label: 'About free-programming-books',
          selector: 'orderFrontStandardAboutPanel:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Update Data',
          submenu: [
            {
              label: 'all',
              accelerator: 'Command+U'
            },
            {
              label: 'chinese',
              click: () => {
                console.log('chinese update click');
                updateTool.syncData(updateTool.Chinese_doc,'zh');
              }
            },
            {
              label: 'english',
              click: () => {
                updateTool.syncData(updateTool.English_doc,'en');
              }
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide Electron',
          accelerator: 'Command+H',
          selector: 'hide:'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:'
        },
        {
          label: 'Show All',
          selector: 'unhideAllApplications:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          selector: 'terminate:'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'Command+Z',
          selector: 'undo:'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+Command+Z',
          selector: 'redo:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'Command+X',
          selector: 'cut:'
        },
        {
          label: 'Copy',
          accelerator: 'Command+C',
          selector: 'copy:'
        },
        {
          label: 'Paste',
          accelerator: 'Command+V',
          selector: 'paste:'
        },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle DevTools',
          accelerator: 'Alt+Command+I',
          click: () => {
            remote.getCurrentWindow().toggleDevTools();
          }
        }
      ]
    },
    {
      label: 'History',
      submenu: [
        {
          label: 'Home',
          accelerator: 'Command+H',
          click: () => {
            remote.getCurrentWebContents().goToIndex(0);
          }
        },

        {
          label: 'Back',
          accelerator: 'Command+[',
          click: () => {
            if(remote.getCurrentWebContents().canGoBack())
              remote.getCurrentWebContents().goBack();
          }
        },

        {
          label: 'Forward',
          accelerator: 'Command+]',
          click: () => {
            if(remote.getCurrentWebContents().canGoForward())
              remote.getCurrentWebContents().goForward();
          }
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        },
        {
          label: 'Close',
          accelerator: 'Command+W',
          selector: 'performClose:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Bring All to Front',
          selector: 'arrangeInFront:'
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'GitHub Repository',
          click: () => {
            shell.openExternal('https://github.com/scottkiss/electron-free-programming-books');
          }
        },
        {
          type: 'separator'
        },{
          label: 'Report Issues',
          click: () => {
            shell.openExternal('https://github.com/scottkiss/electron-free-programming-books/issues');
          }
        },{
          label: 'Check for New Release',
          click: () => {
            shell.openExternal('https://github.com/scottkiss/electron-free-programming-books/releases');
          }
        }]
    }
  ];

  let menu = Menu.buildFromTemplate(template);

  if (remote.process.platform == "darwin") {
    Menu.setApplicationMenu(menu);
  } else {
    Menu.setApplicationMenu(null);
  }

  var ctxmenu = new Menu();
  ctxmenu.append(new MenuItem({ label: 'Home', click: function() { 
     remote.getCurrentWebContents().goToIndex(0);
  } }));

  ctxmenu.append(new MenuItem({ type: 'separator' }));
  ctxmenu.append(new MenuItem({ label: 'Back' , click: function() { 
      if(remote.getCurrentWebContents().canGoBack())
        remote.getCurrentWebContents().goBack(); 
  }}));
  ctxmenu.append(new MenuItem({ label: 'Forward',click:function(){
      if(remote.getCurrentWebContents().canGoForward)
        remote.getCurrentWebContents().goForward()
  } }));

  window.addEventListener('contextmenu', function (e) {
      e.preventDefault();
        ctxmenu.popup(remote.getCurrentWindow());
  }, false);

};

module.exports = menuHandler;
