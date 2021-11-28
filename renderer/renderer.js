// DOM elements
const textArea = document.getElementById("text-area");
const btnSave = document.getElementById("btn-save");

const sendTextData = () => {
  window.ipcRendererAPI.send("text_data", textArea.value);
};

btnSave.addEventListener("click", () => {
  sendTextData();
});
