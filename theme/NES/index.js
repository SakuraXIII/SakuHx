const fs = require("fs");
const { exec } = require("child_process");
const { shell, remote } = require("electron");
const { clipboard } = require("electron");
let global = remote.getGlobal("mySiteInfo");
let aside = document.querySelector("#aside");
let postList = [];

let active = 2;

function init() {
  loadUser();
  loadView();
}
/**
 * 初始化界面信息
 */
function loadUser() {
  document.getElementById("userAvator").src = global.avator ? global.avator : "../../kiana.png";
  document.getElementById("userName").innerText = global.name ?? "Sakura";
  document.getElementById("userSite").innerText = global.blog ?? "https://tonyteachers.gitee.io/";
}

function loadView() {
  document.querySelector(`[data-view="${active}"]`).classList.remove("none");
  if (postList.length === 0) {
    postList = fs.readdirSync(global.postPath);
    InsertPostList();
  }
}

/**
 * 插入文章列表元素节点
 */
function InsertPostList() {
  let ul = document.querySelector(".post ul");
  if (postList.length !== 0) {
    postList.map((value, index, arr) => {
      ul.insertAdjacentHTML(
        "beforeend",
        `
    <li>${value.split(".md")[0]}</li>
    `
      );
    });
  } else {
    ul.insertAdjacentHTML(
      "afterend",
      `
    <div class='not_found_post'>
    好像没有文章哎=￣ω￣=
    </div>
    `
    );
  }
}

/**
 * 绑定选项卡点击切换视图事件
 */
document.getElementsByTagName("ul")[0].addEventListener("click", e => {
  let selectId = e.target.dataset.select;
  console.log(selectId);
  console.log(document.querySelector(`[data-view="${selectId}"]`));
  document.querySelector(`[data-view="${active}"]`).classList.add("none");
  document.querySelector(`[data-view="${selectId}"]`).classList.remove("none");
  active = selectId;
});
/**
 * 同步站点
 */
function syncSite() {
  // exec('npm run start','global.rootPath',(error,stdout,stderr)=>{
  // })
}
/**
 * 在外部浏览器打开博客
 */
function openBrowser() {
  shell.openExternal(remote.getGlobal("mySiteInfo").blog);
}
/**
 * 点击头像下博客地址自动复制
 */
function copySite() {
  let text = document.querySelector("#userSite").innerText;
  clipboard.writeText(text);
  showPopup("已复制到剪贴板");
}
/**
 * 复制成功的气泡提示框
 * @param {string} text 需要显示的文本
 */
function showPopup(text) {
  let flag = true;
  if (flag) {
    let popup = document.createElement("div");
    popup.innerText = text;
    popup.setAttribute("class", "popup nes-balloon from-center");
    popup.style.opacity = 1;
    let pop = document.body.appendChild(popup);
    flag = false;
  }
  setTimeout(() => {
    document.body.removeChild(pop);
    flag = true;
  }, 2000);
}

init();

function closeAside() {
  aside.style.width = 0;
  aside.style.padding = 0;
  aside.style.border = "none";
}

function showAside() {
  aside.style = null;
}
