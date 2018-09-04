const {
    Menu,
    MenuItem,
    dialog,
    ipcMain
} = require('electron');

const { appMenuTemplate } = require('./template');

const menu = Menu.buildFromTemplate(appMenuTemplate); //从模板创建主菜单

let appMenu = function (mainWindow) {
    //增加主菜单（在开发测试时会有一个默认菜单，但打包后这个菜单是没有的，需要自己增）

    //在File菜单下添加名为New的子菜单
    menu.items[0].submenu.append(new MenuItem({ //menu.items获取是的主菜单一级菜单的菜单数组，menu.items[0]在这里就是第1个File菜单对象，在其子菜单submenu中添加新的子菜单
        label: "New",
        click() {
            mainWindow.webContents.send('action', 'new'); //点击后向主页渲染进程发送“新建文件”的命令
        },
        accelerator: 'CmdOrCtrl+N' //快捷键：Ctrl+N
    }));
    //在New菜单后面添加名为Open的同级菜单
    menu.items[0].submenu.append(new MenuItem({
        label: "Open",
        click() {
            mainWindow.webContents.send('action', 'open'); //点击后向主页渲染进程发送“打开文件”的命令
        },
        accelerator: 'CmdOrCtrl+O' //快捷键：Ctrl+O
    }));
    //再添加一个名为Save的同级菜单
    menu.items[0].submenu.append(new MenuItem({
        label: "Save",
        click() {
            mainWindow.webContents.send('action', 'save'); //点击后向主页渲染进程发送“保存文件”的命令
        },
        accelerator: 'CmdOrCtrl+S' //快捷键：Ctrl+S
    }));
    //添加一个分隔符
    menu.items[0].submenu.append(new MenuItem({
        type: 'separator'
    }));
    //再添加一个名为Exit的同级菜单
    menu.items[0].submenu.append(new MenuItem({
        role: 'quit'
    }));

    Menu.setApplicationMenu(menu); //注意：这个代码要放到菜单添加完成之后，否则会造成新增菜单的快捷键无效
};

module.exports = appMenu;