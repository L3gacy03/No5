# NO5时尚广场官网

## 功能说明

+ NO5时尚广场官网首页
+ NO5时尚广场商品列表页
+ NO5时尚广场商品详情页
+ NO5时尚广场购物车页
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
| userId | Number | 用户id | 1 |
| username | String | 用户名 | 123qwe |
| pwd     | String | 密码(加密) | 123qwe         |
| email | String | 电子邮箱 | 774187452@qq.com |

+ response: JSON

| 属性名 | 类型   | 含义                                        | 示例值   |
| ------ | ------ | ------------------------------------------- | -------- |
| code   | Number | 1代表成功, 0代表网络错误, 2代表该用户已存在 | 1        |
| msg    | String | 说明信息                                    | 注册成功 |

### 登录

+ url: ../api/user/login.php
+ method: POST
+ query: 

| 属性名   | 类型   | 含义       | 示例值 |
| -------- | ------ | ---------- | ------ |
| username | String | 用户名     | 123qwe |
| pwd      | String | 密码(加密) | 123qwe |

+ response: JSON

| 属性名 | 类型   | 含义                 | 示例值                   |
| ------ | ------ | -------------------- | ------------------------ |
| code   | Number | 1代表成功, 0代表失败 | 1                        |
| msg    | String | 说明信息             | 登录成功, 即将跳转到首页 |

### 加入购物车

+ url: api/server/addCart.php
+ method: GET
+ query: 

| 属性名  | 类型   | 含义     | 示例值 |
| ------- | ------ | -------- | ------ |
| goodsId | Number | 商品id   | 1      |
| userId  | Number | 用户id   | 1      |
| num     | Number | 商品数量 | 1      |

+ response: JSON

| 属性名 | 类型   | 含义     | 示例值                 |
| ------ | ------ | -------- | ---------------------- |
| data   | String | 说明信息 | 商品已成功加入购物车！ |

### 查询购物车商品

+ url: api/server/getCart.php
+ method: GET
+ query: 

| 属性名  | 类型   | 含义   | 示例值 |
| ------- | ------ | ------ | ------ |
| goodsId | Number | 商品id | 1      |