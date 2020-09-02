# SakuHx

本项目是基于**Electron**构建的静态博客编辑管理工具,主要是为了练习 Electron,其次是对于 Hexo 静态博客编写文章的流程感到些许繁琐,从而开发这个桌面程序为自己写 [博客](https://tonyteachers.gitee.io/) 提供便利.

## 下载

克隆并运行这个项目你需要 [Git](https://git-scm.com) 和 [Node.js](https://nodejs.org/en/download/) 同时也需要 [npm](http://npmjs.com) ,然后执行以下命令

```bash
# Clone this repository
git clone https://github.com/SakuraXIII/SakuHx.git
# Go into the repository
cd SakuHx
# Install dependencies
npm install
# Run the app
npm start
```

## 使用

### 自定义主题

本项目理论上是支持自定义主题的,只需要将存放有编写好的 HTML CSS JS 文件的目录放在根目录下 **theme** 目录中即可,主题名取决于目录名.

本项目目前未提供开放的 API,为了最大程度的自定义,你需要有 NodeJs 的基础,甚至是 Electron 的相关知识.

Electron 是同时具备浏览器环境和 NodeJs 运行时环境,所以你几乎可以在你的 js 文件中任意使用两种环境的 API,只需遵循规范即可.

### 配置

程序的配置文件是根目录下的 **conf.json** 文件,当然在程序中有对应的设置页提供便捷的 UI 操作

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
