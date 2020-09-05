/*
 * @Author: Sakura Sun
 * @Date: 2020-08-29 23:20:46
 * @LastEditTime: 2020-09-05 15:37:20
 * @Description: 文章列表页
 */
const fs = require("fs");
class Post {
  postList = [];
  static instance = null;
  constructor() {
    this.postList = this.postList.length == 0 ? fs.readdirSync(App.global.postPath) : this.postList;
    this.InsertPostList();
    this.addListener();
  }
  /**
   * 单例模式写法
   */
  static getInstance() {
    if (this.instance == null) {
      this.instance = new Post();
    }
    return this.instance;
  }

  /**
   * 插入文章列表元素节点
   */
  InsertPostList() {
    let ul = document.querySelector(".post ul");
    if (this.postList.length !== 0) {
      this.postList.map((value, index, arr) => {
        Post.addPost(ul, value);
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
   * 添加文章列表点击事件监听,处理打开和删除文章操作
   */
  addListener() {
    document.querySelector(".post ul").addEventListener("click", e => {
      switch (e.target.id) {
        case "postname":
          this.editPost(e.target.innerText + ".md");
          break;
        case "delpost":
          // previousElementSibling 兄弟节点
          this.delPost(e.target.previousElementSibling.innerText + ".md");
          break;
        default:
          break;
      }
    });
  }
  /**
   * 向文章列表插入新文章
   * @param {Element} el 容纳子元素的父元素
   * @param {String}} text 插入的文本
   */
  static addPost(el, text) {
    el.insertAdjacentHTML(
      "beforeend",
      `
  <li class='post_item'>
    <div class="nes-container is-rounded">
      <span class='nes-pointer' id='postname'>${text.split(".")[0]}</span>
      <i class='nes-pointer' id='delpost' style='font-style:normal;'>删除</i>
    </div>
  </li>
`
    );
  }
  /**
   * 打开文章
   * @param {string} postName 文章名
   */
  editPost(postName) {
    if (App.global.openExtra) {
      App.extraEditor(postName);
    } else {
      window.open(App.global.postPath + "\\" + postName);
    }
  }
  /**
   * 删除文章
   * @param {string} postName 文章名 带后缀名
   */
  delPost(postName) {
    let ul = document.querySelector(".post ul");
    let index = this.postList.indexOf(postName);
    let path = App.global.postPath + "/" + postName;
    fs.unlink(path, err => {
      if (err) throw err;
      App.showPopup("删除成功!!");
      ul.removeChild(ul.children[index]);
      this.postList.splice(index, 1);
    });
  }
}

exports.Post = Post;
