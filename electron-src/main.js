const electron = require('electron');
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
function createWindow () {
	// Create the browser window.
	mainWindow = new electron.BrowserWindow({
		width: 800,
		height: 600,
		x: undefined,
		y: undefined,
		center: undefined,
		minWidth: 0,
		minHeight: 0,
		maxWidth: undefined,
		maxHeight: undefined,
		resizable: true, 
		show: true,
		icon: undefined,
		frame: true,
		alwaysOnTop: false,
 
		// Boolean - The `width` and `height` would be used as web page's size, which means the actual window's size will include window frame's size and be slightly larger. Default is `false`. 
		useContentSize: true, // true for precision
		fullscreen: false,
		skipTaskbar: false,
		kiosk: false,
		title: 'Electron',
		acceptFirstMouse: false,
		disableAutoHideCursor: false,
		autoHideMenuBar: true,
		enableLargerThanScreen: false,
		backgroundColor: '#000',
		darkTheme: false,
		transparent: false,
 
  // String - Specifies the type of the window, which applies additional platform-specific properties. By default it's undefined and you'll get a regular app window. Supported values: 
  // * On Linux, possible types are `desktop`, `dock`, `toolbar`, `splash`, `notification`. 
  // * On OS X, possible types are `desktop`, `textured`. The `textured` type adds metal gradient appearance (`NSTexturedBackgroundWindowMask`). The `desktop` type places the window at the desktop background window level (`kCGDesktopWindowLevel - 1`). Note that desktop window will not receive focus, keyboard or mouse events, but you can use `globalShortcut` to receive input sparingly. 
  type: undefined,
 
  // String, OS X - specifies the style of window title bar. This option is supported on OS X 10.10 Yosemite and newer. There are three possible values: 
  // * `default` or not specified, results in the standard gray opaque Mac title bar. 
  // * `hidden` results in a hidden title bar and a full size content window, yet the title bar still has the standard window controls ("traffic lights") in the top left. 
  // * `hidden-inset` results in a hidden title bar with an alternative look where the traffic light buttons are slightly more inset from the window edge. 
  titleBarStyle: undefined,
 
  // Object - Settings of web page's features. 
  webPreferences: {
 
    // Boolean - Whether node integration is enabled. Default is `true`. 
    nodeIntegration: true,
 
    // String - Specifies a script that will be loaded before other scripts run in the page. This script will always have access to node APIs no matter whether node integration is turned on or off. The value should be the absolute file path to the script. 
 
    // When node integration is turned off, the preload script can reintroduce Node global symbols back to the global scope. See example [here](https://github.com/atom/electron/blob/master/docs/api/process.md#event-loaded). 
    preload: undefined,
 
    // String - Sets the session used by the page. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. if there is no `persist:` prefix, the page will use an in-memory session. By assigning the same `partition`, multiple pages can share the same session. If the `partition` is unset then default session of the app will be used. 
    partition: undefined,
 
    // Number - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`. 
    zoomFactor: 1.0,
 
    // Boolean - Enables JavaScript support. Default is `true`. 
    javascript: true,
 
    // Boolean - When setting `false`, it will disable the same-origin policy (Usually using testing websites by people), and set `allowDisplayingInsecureContent` and `allowRunningInsecureContent` to `true` if these two options are not set by user. Default is `true`. 
    webSecurity: true,
 
    // Boolean - Allow an https page to display content like images from http URLs. Default is `false`. 
    allowDisplayingInsecureContent: false,
 
    // Boolean - Allow a https page to run JavaScript, CSS or plugins from http URLs. Default is `false`. 
    allowRunningInsecureContent: false,
 
    // Boolean - Enables image support. Default is `true`. 
    images: true,
 
    // Boolean - Enables Java support. Default is `false`. 
    java: false,
 
    // Boolean - Make TextArea elements resizable. Default is `true`. 
    textAreasAreResizable: true,
 
    // Boolean - Enables WebGL support. Default is `true`. 
    webgl: true,
 
    // Boolean - Enables WebAudio support. Default is `true`. 
    webaudio: true,
 
    // Boolean - Whether plugins should be enabled. Default is `false`. 
    plugins: false,
 
    // Boolean - Enables Chromium's experimental features. Default is `false`. 
    experimentalFeatures: false,
 
    // Boolean - Enables Chromium's experimental canvas features. Default is `false`. 
    experimentalCanvasFeatures: false,
 
    // Boolean - Enables overlay scrollbars. Default is `false`. 
    overlayScrollbars: false,
 
    // Boolean - Enables overlay fullscreen video. Default is `false`. 
    overlayFullscreenVideo: false,
 
    // Boolean - Enables Shared Worker support. Default is `false`. 
    sharedWorker: false,
 
    // Boolean - Enables DirectWrite font rendering system on Windows. Default is `true`. 
    directWrite: true,
 
    // Boolean - Page would be forced to be always in visible or hidden state once set, instead of reflecting current window's visibility. Users can set it to `true` to prevent throttling of DOM timers. Default is `false`. 
    pageVisibility: false
  }
	});

	// and load the index.html of the app.
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron.app.on('ready', createWindow);

// Quit when all windows are closed.
electron.app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		electron.app.quit()
	}
})

electron.app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
