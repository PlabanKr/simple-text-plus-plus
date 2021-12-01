const { app, BrowserWindow, ipcMain, Menu } = require("electron");
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
        },
        {
          label: "Open File",
        },
        {
          label: "Save File",
        },
        {
          label: "Close File",
        },
      ],
    },
    {
      label: "Edit",
      submenu: [
        {
          label: "Undo",
        },
        {
          label: "Cut",
        },
        {
          label: "Copy",
        },
        {
          label: "Paste",
        },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Send Feedback",
        },
        {
          label: "About SimpleText++",
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
