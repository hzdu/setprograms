// ./app/main.js
 
//采用javascript严格模式
// 'use strict';
 
// 应用的控制模块
const electron = require('electron');
const app = electron.app;
 
// 创建原生浏览器窗口的模块
const BrowserWindow = electron.BrowserWindow;
var mainWindow = null;
 
// 当所有窗口都关闭的时候退出应用
app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
 
// 当 Electron 结束的时候，这个方法将会生效


// 初始化并准备创建浏览器窗口
app.on('ready', function () {
 
    // 创建浏览器窗口.
    mainWindow = new BrowserWindow({
        width: 500,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        icon: 'assets/images/application.ico'
    });

    // 隐藏菜单栏
    const { Menu } = require('electron');
    Menu.setApplicationMenu(null);
    mainWindow.setMinimizable(false)
    mainWindow.setMaximizable(false)
 
    // 载入应用的 index.html
    mainWindow.loadURL('file://' + __dirname + '/../index.html');
    // console.log('file://' + __dirname + '/../index.html')
 
    // 打开开发工具
    // mainWindow.openDevTools();

    // 窗口关闭时触发
    mainWindow.on('closed', function () {
        // 想要取消窗口对象的引用，如果你的应用支持多窗口，
        // 通常你需要将所有的窗口对象存储到一个数组中，
        // 在这个时候你应该删除相应的元素
        mainWindow = null;
    });
});