const { app, BrowserWindow, ipcMain } = require("electron");
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
  createWindow();

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
