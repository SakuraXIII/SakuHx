/*
 * @Author: Sakura Sun
 * @Date: 2020-08-30 14:45:45
 * @LastEditTime: 2020-09-05 15:40:19
 * @Description: 编辑页
 */
const { writeFile } = require("fs");
const { title } = require("process");
const { Post } = require("./post");
class Edit {
  static instance = null;
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
    document.querySelector("#draft").addEventListener("click", this.saveDraft);
    document.querySelector("#save").addEventListener("click", this.saveFile);
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
    var observer = new MutationObserver(mutationsList => {
      if (targetNode.children.length == 0) {
        //阻止退格键将p标签也给删除,导致内部完全为空
        let node = document.createElement("div");
        targetNode.appendChild(node);
      }
    });
    // 开始观察已配置突变的目标节点
    observer.observe(targetNode, config);
  }
  /**
   * 保存到草稿
   */
  saveDraft() {
    App.showPopup("暂存成功");
  }
  /**
   * 保存到文件
   */
  saveFile() {
    let title = document.querySelector("#title").innerText;
    // 这一段文章配置信息不能缩进格式化,否则前面会有制表符,导致配置不生效
    let str = `---
title: ${title}
date: ${new Date().toLocaleDateString()}
tags: 
---\n`;
    let content = document.querySelector("#edit_area").innerText;
    content.trim();
    let post = str + content;
    let file = `${App.global.postPath}/${title}.md`;
    writeFile(file, post, { flag: "w" }, err => {
      if (err) throw err;
      App.showPopup("保存成功");
      let ul = document.querySelector(".post ul");
      Post.addPost(ul, title + ".md");
    });
  }
}

exports.Edit = Edit;
