/*
 * @Author: Sakura Sun
 * @Date: 2020-08-30 14:45:45
 * @LastEditTime: 2020-09-09 14:56:51
 * @Description: 编辑页
 */
const { writeFile } = require("fs");
class Edit {
  static instance = null;
  flag = true;
  constructor() {
    this.init();
  }
  /**
   * 单例模式写法
   */
  static getInstance() {
    if (this.instance == null) {
      this.instance = new Edit();
    }
    return this.instance;
  }

  init() {
    this.createObserver();
    this.bindClick();
  }
  bindClick() {
    document.querySelector("#create").addEventListener("click", () => {
      this.createNewPost();
    });
    document.querySelector("#save").addEventListener("click", () => {
      this.saveFile();
      this.setTimeSave(); //在出现一次保存后开始自动保存
    });
  }
  /**
   * 创建节点观察对象,监视编辑区的变化
   */
  createObserver() {
    // 选择将观察突变的节点
    var targetNode = document.getElementById("edit_area");
    // 观察者的选项(要观察哪些突变)
    var config = { childList: true, subtree: true, characterData: true };
    // 创建一个链接到回调函数的观察者实例
    /**
     * 观察节点变化的异步回调
     * @param {Array} mutationsList 节点变化记录列表
     */
    var observer = new MutationObserver(mutationsList => {});
    // 开始观察已配置突变的目标节点
    observer.observe(targetNode, config);
  }
  /**
   * 保存到草稿
   */
  createNewPost() {
    document.querySelector("#title").innerText = "新的文章";
    document.querySelector("#edit_area").innerText = "";
    this.flag = true;
  }
  /**
   * 保存到文件
   */
  saveFile() {
    let title = document.querySelector("#title").innerText;
    let content = document.querySelector("#edit_area").innerText;
    content.trim();
    content == "请写下你的想法..." ? "" : content;
    let file = `${App.global.postPath}/${title}.md`;
    writeFile(file, content, { flag: "w" }, err => {
      if (err) throw err;
      App.showPopup("保存成功");
      let ul = document.querySelector(".post ul");
      if (Post.postList.length !== 0 && this.flag) {
        let text = title + ".md";
        Post.addPost(ul, text);
        Post.postList.push(text);
      }
      this.flag = false;
    });
  }
  /**
   * 打开文章列表中选中的文章
   * @param {String} content 填充编辑区的文本
   * @param {String} title 文件名
   */
  writePost(content, title) {
    let str = title.split(".")[0];
    document.querySelector("#title").innerText = str;
    document.querySelector("#edit_area").innerText = content;
    this.flag = false;
  }
  /**
   * 定时保存文章
   */
  setTimeSave() {
    let minute = 1;
    setInterval(() => {
      this.saveFile();
    }, minute * 60 * 1000);
  }
}

exports.Edit = Edit;
