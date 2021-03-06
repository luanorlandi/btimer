if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode.');
  require('electron-reload')(__dirname);
}

const electron = require('electron');
const path = require('path');
const windowStateKeeper = require('electron-window-state');

const { app } = electron;
const { BrowserWindow } = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let win;
function createWindow() {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 660,
    defaultHeight: 165,
    file: 'btimer-window-state.json',
  });

  win = new BrowserWindow({
    alwaysOnTop: true,
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    backgroundColor: '#113A47',
    resizable: true,
    icon: path.join(__dirname, 'src/assets/clock-1024.png'),
    title: 'BTimer',
  });

  win.loadURL(`file://${__dirname}/distweb/index.html`);

  win.on('closed', () => {
    win = null;
  });
  win.setMenu(null);

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }
  mainWindowState.manage(win);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
