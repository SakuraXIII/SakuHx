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
    addListener();
  }
}
/**
 * 插入文章列表元素节点
 */
function InsertPostList() {
  let ul = document.querySelector(".post ul");
  if (postList.length !== 0) {
    ul.insertAdjacentHTML(
      "beforeend",
      `
    <li>共计<span class="nes-text is-primary">${postList.length}</span>篇文章</li>
    `
    );
    postList.map((value, index, arr) => {
      ul.insertAdjacentHTML(
        "beforeend",
        `
      <li class='post_item'>
        <div class="nes-container is-rounded">
          <span class='nes-pointer' id='postname'>${value.split(".")[0]}</span>
          <i class='nes-pointer' id='delpost' style='font-style:normal;'>删除</i>
        </div>
      </li>
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

function addListener() {
  document.querySelector(".post ul").addEventListener("click", e => {
    switch (e.target.id) {
      case "postname":
        editPost(e.target.innerText + ".md");
        break;
      case "delpost":
        // previousElementSibling 兄弟节点
        delPost(e.target.previousElementSibling.innerText + ".md");
        break;
      default:
        break;
    }
  });
}
/**
 * 打开文章
 * @param {string} postName 文章名
 */
function editPost(postName) {
  if (global.openExtra) {
    extraEditor(postName);
  } else {
    window.open(global.postPath + "\\" + postName);
  }
}
/**
 * 删除文章
 * @param {string} postName 文章名
 */
function delPost(postName) {
  let ul = document.querySelector(".post ul");
  let index = postList.indexOf(postName);
  postList.splice(index, 1);
  ul.removeChild(ul.children[index + 1]);
  // fs.unlink(path, err => {
  //   if (err) throw err;
      showPopup("删除成功!!");
  // });
}

/**
 * 绑定选项卡点击切换视图事件
 */
document.getElementsByTagName("ul")[0].addEventListener("click", e => {
  let selectId = e.target.dataset.select;
  document.querySelector(`[data-view="${active}"]`).classList.add("none");
  document.querySelector(`[data-view="${selectId}"]`).classList.remove("none");
  active = selectId;
});
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
    var pop = document.body.appendChild(popup);
    flag = false;
  }
  setTimeout(() => {
    document.body.removeChild(pop);
    flag = true;
  }, 2000);
}

init();
/**
 * 使用外部编辑器打开文章
 * @param {string} postName 要打开的文章
 */
function extraEditor(postName) {
  let cmd = global.extraEditor + " " + postName;
  console.log(cmd);
  exec(cmd, { cwd: global.postPath }, (error, stdout, stderr) => {});
}
/**
 * 同步站点
 */
function syncSite() {
  // exec('npm run start',{cwd:global.rootPath},(error,stdout,stderr)=>{
  // })
}
/**
 * 外部浏览器打开博客
 */
function openBrowser() {
  shell.openExternal(remote.getGlobal("mySiteInfo").blog);
}

function closeAside() {
  aside.style.width = 0;
  aside.style.padding = 0;
  aside.style.border = "none";
}

function showAside() {
  aside.style = null;
}
