/*
 * @Author: Sakura Sun
 * @Date: 2020-08-30 14:45:45
 * @LastEditTime: 2020-08-30 21:52:18
 * @Description: 设置页
 */
class Setting {
  static instance = null;
  constructor() {}
  /**
   * 单例模式写法
   */
  static getInstance() {
    if (this.instance == null) {
      this.instance = new Post();
    }
    return this.instance;
  }

  
}

exports.Setting = Setting;
