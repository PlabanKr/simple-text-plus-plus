const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  shell,
} = require("electron");
const path = require("path");
const fs = require("fs");

let filename = "";

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    title: "SimpleText++",
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "renderer/preload.js"),
    },
  });

  window.loadFile("renderer/index.html");
};

app.whenReady().then(() => {
  // Main Window
  createWindow();

  // Menu
  const menuTemplate = [
    {
      label: "File",
      submenu: [
        {
          label: "New File",
          accelerator: "CmdOrCtrl + N",
        },
        {
          label: "Open File",
          accelerator: "CmdOrCtrl + O",
        },
        { type: "separator" },
        {
          label: "Save File",
          click: () => {},
          accelerator: "CmdOrCtrl + S",
        },
        { type: "separator" },
        { role: "close" },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { type: "separator" },
        { role: "selectAll" },
        {
          label: "Find",
          accelerator: "CmdOrCtrl + F",
        },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Send Feedback",
          click: () => {
            shell.openExternal(
              "https://github.com/PlabanKr/simple-text-plus-plus/issues"
            );
          },
        },
        {
          label: "About SimpleText++",
          click: () => {
            shell.openExternal(
              "https://github.com/PlabanKr/simple-text-plus-plus"
            );
          },
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("filename_data", (event, data) => {
  filename = data;
});

ipcMain.on("text_data", (event, data) => {
  if (filename != "") {
    fs.writeFileSync(`${filename}.txt`, data);
  }
});
