/*
 * @Author: Sakura Sun
 * @Date: 2020-08-30 14:45:45
 * @LastEditTime: 2020-09-05 14:17:00
 * @Description: 编辑页
 */

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
    let str = `
    ---
    title: ${document.querySelector("#title").innerText},
    date: ${new Date().toLocaleDateString()},
    
    ---
    `;
    let content = document.querySelector("#edit_area").innerText;
    console.log(content)
    App.showPopup("保存成功");
  }
}

exports.Edit = Edit;
