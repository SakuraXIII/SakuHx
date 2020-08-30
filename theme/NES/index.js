const fs = require("fs");
const { exec } = require("child_process");
const { shell, remote } = require("electron");
const { clipboard } = require("electron");
const { Post } = require("./post");
let global = remote.getGlobal("mySiteInfo");
let aside = document.querySelector("#aside");

let active = 2;

class App {
  constructor() {
    this.init();
  }

  init() {
    this.loadUser();
    this.bindView();
    this.bindClick();
  }
  /**
   * 初始化用户信息
   */
  loadUser() {
    document.getElementById("userAvator").src = global.avator ? global.avator : "../../kiana.png";
    document.getElementById("userName").innerText = global.name ?? "Sakura";
    document.getElementById("userSite").innerText = global.blog ?? "https://tonyteachers.gitee.io/";
  }
  /**
   * 绑定选项卡点击切换视图事件
   */
  bindView() {
    document.getElementsByTagName("ul")[0].addEventListener("click", e => {
      let selectId = e.target.dataset.select;
      document.querySelector(`[data-view="${active}"]`).classList.add("none");
      document.querySelector(`[data-view="${selectId}"]`).classList.remove("none");
      active = selectId;
      switch (selectId) {
        case 2:
          new Post();
          break;
        case 3:
          break;
        case 4:
          break;
        default:
          break;
      }
    });
  }
  /**
   * 绑定各种点击事件
   */
  bindClick() {
    document.querySelector("#userSite").addEventListener("click", this.copySite);
    document.querySelector("#syncSite").addEventListener("click", this.syncSite);
    document.querySelector("#openBrowser").addEventListener("click", this.openBrowser);
    document.querySelector("#showAside").addEventListener("click", this.showAside);
    document.querySelector("#closeAside").addEventListener("click", this.closeAside);
  }
  /**
   * 气泡提示框
   * @param {string} text 需要显示的文本
   */
  static showPopup(text) {
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

  /**
   * 点击头像下博客地址自动复制
   */
  copySite() {
    let text = document.querySelector("#userSite").innerText;
    clipboard.writeText(text);
    App.showPopup("已复制到剪贴板");
  }
  /**
   * 同步站点
   */
  syncSite() {
    // exec('npm run start',{cwd:global.rootPath},(error,stdout,stderr)=>{
    // })
  }
  /**
   * 外部浏览器打开博客
   */
  openBrowser() {
    shell.openExternal(remote.getGlobal("mySiteInfo").blog);
  }
  /**
   * 收起侧边栏
   */
  closeAside() {
    aside.style.width = 0;
    aside.style.padding = 0;
    aside.style.border = "none";
  }
  /**
   * 显示侧边栏
   */
  showAside() {
    aside.style = null;
  }
}

/**
 * 使用外部编辑器打开文章
 * @param {string} postName 要打开的文章
 */
function extraEditor(postName) {
  let cmd = global.extraEditor + " " + postName;
  exec(cmd, { cwd: global.postPath }, (error, stdout, stderr) => {});
}

new App()