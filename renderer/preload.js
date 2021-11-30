const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipcRendererAPI", {
  send: (channel, data) => {
    let validChannels = ["text_data", "filename_data"];

    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
});
