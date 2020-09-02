/*
 * @Author: Sakura Sun
 * @Date: 2020-08-30 14:45:45
 * @LastEditTime: 2020-09-02 09:31:02
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
    // this.createObserver()
  }
  /**
   * 创建节点观察对象,监视编辑区的变化
   */
  createObserver() {
    // 选择将观察突变的节点
    var targetNode = document.getElementById("edit_area");
    // 观察者的选项(要观察哪些突变)
    var config = { attributes: true, childList: true, subtree: true };
    // 创建一个链接到回调函数的观察者实例
    var observer = new MutationObserver(this.observeEvent);
    // 开始观察已配置突变的目标节点
    observer.observe(targetNode, config);
    console.log("ldkjf");
  }
  /**
   * 观察节点变化的异步回调
   * @param {Array} mutationsList 节点变化记录列表
   * @param {MutationObserver} observe 实例对象
   */
  observeEvent(mutationsList, observe) {
    console.log(mutationsList);
  }
}

exports.Edit = Edit;
