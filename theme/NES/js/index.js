const { exec } = require("child_process");
const { shell, remote, clipboard } = require("electron");
//index.js被引入到index.html中,所以路径是以html为基准进行查找
const { Post } = require("./js/post");
const { Setting } = require("./js/setting");
const { Edit } = require("./js/edit");
class App {
  active = 3;
  static global = remote.getGlobal("mySiteInfo");
  constructor() {
    this.init();
  }

  init() {
    this.loadUser();
    this.showView();
    this.bindView();
    this.bindClick();
  }
  /**
   * 初始化用户信息
   */
  loadUser() {
    document.getElementById("userAvator").src = App.global.avator
      ? App.global.avator
      : "../../kiana.png";
    document.getElementById("userName").innerText = App.global.name ? App.global.name : "Sakura";
    document.getElementById("userSite").innerText = App.global.blog
      ? App.global.blog
      : "https://tonyteachers.gitee.io/";
  }
  /**
   * 绑定选项卡点击切换视图事件
   */
  bindView() {
    document.getElementsByTagName("ul")[0].addEventListener("click", e => {
      let selectId = e.target.dataset.select; //当选项按钮点击过快时会出现无法获取data-select的情况 (undefined)
      document.querySelector(`[data-view="${this.active}"]`)?.classList.add("none");
      this.active = selectId ?? this.active; // 当出现undefined时不更新active
      this.showView();
    });
  }
  /**
   * 显示激活的页面
   */
  showView() {
    document.querySelector(`[data-view="${this.active}"]`).classList.remove("none");
    document.querySelector(".right").scrollTop = 0; //当某个选项卡中滚动了页面,切换到其他选项卡时,回到顶部
    switch (this.active.toString()) {
      case "2":
        Post.getInstance();
        break;
      case "3":
        Edit.getInstance();
        break;
      case "4":
        Setting.getInstance();
        break;
      default:
        break;
    }
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
    exec("npm run start", { cwd: App.global.rootPath }, (error, stdout, stderr) => {
      if (stderr) throw stderr;
      App.showPopup("同步站点成功");
      if (App.global.openGit) {
        shell.openExternal(App.global.gitRepo);
      }
    });
  }
  /**
   * 外部浏览器打开博客
   */
  openBrowser() {
    shell.openExternal(App.global.blog);
  }
  /**
   * 收起侧边栏
   */
  closeAside() {
    let aside = document.querySelector("#aside");
    document.body.style.setProperty("--asidewidth", "0%");
    aside.style.padding = 0;
    aside.style.border = "none";
  }
  /**
   * 显示侧边栏
   */
  showAside() {
    let aside = document.querySelector("#aside");
    document.body.style.setProperty("--asidewidth", "25%");
    aside.style = null;
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
   * 使用外部编辑器打开文章
   * @param {string} postName 要打开的文章
   */
  static extraEditor(postName) {
    let cmd = App.global.extraEditor + " " + postName;
    exec(cmd, { cwd: App.global.postPath }, (error, stdout, stderr) => {
      if (error | stderr) App.showPopup("外部编辑器打开失败--->" + error + stderr);
    });
  }
}

new App();
