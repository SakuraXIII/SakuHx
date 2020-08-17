const fs = require("fs");
const { exec } = require("child_process");
const { shell, remote } = require("electron");
const { clipboard } = require("electron");
let global = remote.getGlobal;
console.log( remote.getGlobal('mySiteInfo '))
let aside = document.querySelector("#aside");
let postList = [];

let active = 1;

function init() {
  loadUser();
  loadView();
}

function loadUser() {
  document.getElementById("userAvator").src = global("mySiteInfo").avator
    ? global("mySiteInfo").avator
    : "../kiana.png";
  document.getElementById("userName").innerText = global("mySiteInfo").name ?? "Sakura";
  document.getElementById("userSite").innerText =
    global("mySiteInfo").blog ?? "https://tonyteachers.gitee.io/";
}

function loadView() {
  document.querySelector(`[data-view="${active}"]`).classList.remove("none");
  console.log(global)
  // fs.readdir(global.postPath, (err, files) => {
  //   console.log(files);
  // });
}

function closeAside() {
  aside.style.width = 0;
  aside.style.padding = 0;
  aside.style.border = "none";
}

function showAside() {
  aside.style = null;
}

document.getElementsByTagName("ul")[0].addEventListener("click", e => {
  let selectId = e.target.dataset.select;
  console.log(selectId);
  console.log(document.querySelector(`[data-view="${selectId}"]`));
  document.querySelector(`[data-view="${active}"]`).classList.add("none");
  document.querySelector(`[data-view="${selectId}"]`).classList.remove("none");
  active = selectId;
});

function syncSite() {
  // exec('npm run start','G:\\Blog',(error,stdout,stderr)=>{
  // })
}

function openBrowser() {
  shell.openExternal(remote.getGlobal("mySiteInfo").blog);
}

function copySite() {
  let text = document.querySelector("#userSite").innerText;
  clipboard.writeText(text);
  showPopup("已复制到剪贴板");
}

function showPopup(text) {
  let popup = document.createElement("div");
  popup.innerText = text;
  popup.setAttribute("class", "popup nes-balloon from-center");
  popup.style.opacity = 1;
  let pop = document.body.appendChild(popup);
  setTimeout(() => {
    document.body.removeChild(pop);
  }, 2000);
}

init();
