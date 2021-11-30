// DOM elements
const textArea = document.getElementById("text-area");
const filename = document.getElementById("filename");
const btnSave = document.getElementById("btn-save");

const sendTextData = () => {
  if (filename.value != "") {
    window.ipcRendererAPI.send("filename_data", filename.value);
    window.ipcRendererAPI.send("text_data", textArea.value);
  } else {
    window.ipcRendererAPI.send("filename_data", "Untitled");
    window.ipcRendererAPI.send("text_data", textArea.value);
  }
};

btnSave.addEventListener("click", () => {
  sendTextData();
});
