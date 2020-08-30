class Post {
  postList = [];

  constructor() {
    postList = this.postList.length == 0 ? fs.readdirSync(global.postPath) : this.postList;
    this.InsertPostList();
    this.addListener();
  }
  /**
   * 插入文章列表元素节点
   */
  InsertPostList() {
    let ul = document.querySelector(".post ul");
    if (postList.length !== 0) {
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
  /**
   * 添加文章列表点击事件监听,处理打开和删除文章操作
   */
  addListener() {
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
  editPost(postName) {
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
  delPost(postName) {
    let ul = document.querySelector(".post ul");
    let index = postList.indexOf(postName);
    postList.splice(index, 1);
    ul.removeChild(ul.children[index]);
    // fs.unlink(path, err => {
    //   if (err) throw err;
    showPopup("删除成功!!");
    // });
  }
}

exports.Post = Post;