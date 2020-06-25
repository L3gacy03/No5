# NO5时尚广场官网

## 功能说明

+ NO5时尚广场官网首页
+ 魅族官网手机列表页
+ 魅族官网商品详情页
+ NO5时尚广场订单页
+ NO5时尚广场登录页
+ NO5时尚广场注册页

## 使用技术

+ HTML
+ CSS3
+ Javascript
+ ES6
+ Ajax + JSON
+ jQuery
+ PHP
+ MySQL
+ Git
+ Glup
+ Nodejs
+ NPM

## 接口文档

### 注册

+ url: ../api/user/register.php
+ method: POST
+ query: 

| 属性名  | 类型   | 含义   | 示例值      |
| ------- | ------ | ------ | ----------- |
| account | String | 用户名 | 15627119728 |
| pwd     | String | 密码   | 111         |

+ response: JSON

| 属性名 | 类型   | 含义                 | 示例值                   |
| ------ | ------ | -------------------- | ------------------------ |
| code   | Number | 1代表成功, 0代表失败 | 1                        |
| msg    | String | 说明信息             | 成功 或 网络错误, 请重试 |

### 登录

+ url: ../api/user/login.php
+ method: POST
+ query: 

| 属性名  | 类型   | 含义   | 示例值      |
| ------- | ------ | ------ | ----------- |
| account | String | 用户名 | 15627119728 |
| pwd     | String | 密码   | 111         |

+ response: JSON

| 属性名 | 类型   | 含义                 | 示例值                     |
| ------ | ------ | -------------------- | -------------------------- |
| code   | Number | 1代表成功, 0代表失败 | 1                          |
| msg    | String | 说明信息             | 登录成功 或 账号或密码错误 |
