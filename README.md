# react-app

搭建react的应用架构，使用webpack4，babel7，eslint,json-server,material-ui,react-router-dom,redux等技术栈

# run

1. `git clone https://github.com/lzhengms/react-app.git`
2. `npm i`
3. `npm start`
4. `访问 http://localhost:9000/和http://localhost:9000/about可看效果`
4. `npm build`

## RESTFUL API

1. 使用json_server模拟数据
2. [API](https://github.com/lzhengms/react-app/tree/master/src/mocks)

## 目录结构

1. `webpack`: 为webpack配置目录；
2. `webpack.config.js`: 为webpack配置入口文件；
3. `package.json`: 为项目依赖管理文件；
4. `package-json.lock`: 为项目依赖版本锁文件；
5. `.babelrc`: babel的配置文件，使用babel编译React和JavaScript代码；
6. `eslintrc, eslintignore`: 分别为eslint语法检测配置及需要忽略检查的内容或文件；
7. `postcss.config.js`: CSS后编译器postcss的配置文件；
8. `public`: 一些静态文件，里面包含生成index.html的模板文件
9. `README.md`: 项目说明文档；
10. `src`: 开发代码目录
   1. ├──`mocks` 模拟的服务端数据
   2. ├──`styles` 样式
   3. ├──`components` 展示型组件
   4. ├──`config` 全局配置
   5. ├──`constants` 常量
   6. ├──`containers` 容器组件
   8. ├──`store` redux store相关
   9. ├──`origins` 应用请求的服务器的地址配置
   10. ├──`routes` 应用路由模块
   11. ├──`services` 应用的请求服务模块
   12. ├──`index.html` 应用入口html
   13. ├──`index.js` 项目根组件文件

## 使用的技术栈

1. webpack4, babel7, eslint, postcss
2. react,react-dom: react的基本包
3. redux，react-redux， react-router-redux：状态管理容器，把react，router和redux链接起来
4. redux-devtools： 开发调试工具
5. redux-saga： 异步请求管理
6. axios： 请求包
7. json-server：实现restfulapi，模拟服务端
8. concurrently： 实现多命令同时运行
9. react-router-dom：实现引用路由管理
10. react-loadable: 做异步路由

## 应用架构

![img](/images/structure.png)


## 开发过程中遇到的问题和解决方式：
### 问题一如下：

![img](/images/scss.png)

解决方法：

在webpack中的scss-loader中加入exclude，如下图：

![img](/images/scss-handler.png)

### 问题二如下：

![img](/images/transform-runtime.png)

解决方法：

去掉babel中的@babel/plugin-transform-runtime插件

![img](/images/transform-runtime-handler.png)

## 待续
1. 加入immutable支持不可变数据
2. 加入redux-persit支持redux状态树的持久化
3. 加入jest集成应用测试