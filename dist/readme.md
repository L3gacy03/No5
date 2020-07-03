# NO5时尚广场官网

## 功能说明

+ NO5时尚广场官网首页
+ NO5时尚广场商品列表页
  + 不带数量加入购物车功能
  + 分页和上下页功能
  + 商品按默认排序和按销量排序功能
+ NO5时尚广场商品详情页
  + 带数量加入购物车功能
  + 放大镜功能
+ NO5时尚广场购物车页
  + 用户对应的购物车功能
  + 删除商品和清空购物车功能
  + 付款小计和合计金额功能
  + 修改数量功能
+ NO5时尚广场登录页
  + 登录功能
+ NO5时尚广场注册页
  + 注册功能
+ 公共功能
  + 三级导航菜单和购物车订单功能
  + 登录显示用户功能

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

### 查询数据库全部商品

+ url: api/server/getGoods.php
+ method: GET
+ query:

| 属性名 | 类型   | 含义     | 示例值 |
| ------ | ------ | -------- | ------ |
| sort   | Number | 商品id   | 1      |
| userId | Number | 用户id   | 1      |
| num    | Number | 商品数量 | 1      |

+ response: JSON

| 属性名   | 类型   | 含义     | 示例值                                    |
| -------- | ------ | -------- | ----------------------------------------- |
| goodsId  | Number | 商品id   | 1                                         |
| imgUrl   | String | 商品图片 | img.jpg                                   |
| title    | String | 商品标题 | 兰蔻水份缘舒缓晚霜(53391) 本周特价！ 50ml |
| price    | Number | 商品价格 | 288.00                                    |
| discount | String | 商品折扣 | (4.8折)                                   |

### 列表页的加入购物车&详情页的加入购物车

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

| 属性名 | 类型   | 含义   | 示例值 |
| ------ | ------ | ------ | ------ |
| userId | Number | 用户id | 1      |

respinse: JSON

| 属性名   | 类型   | 含义     | 示例值                                    |
| -------- | ------ | -------- | ----------------------------------------- |
| imgUrl   | String | 商品图片 | img.jpg                                   |
| title    | String | 商品标题 | 兰蔻水份缘舒缓晚霜(53391) 本周特价！ 50ml |
| price    | Number | 商品价格 | 288.00                                    |
| discount | String | 商品折扣 | (4.8折)                                   |

### 删除购物车商品

+ url: api/server/delCart.php
+ method: GET
+ query: 

| 属性名  | 类型   | 含义   | 示例值 |
| ------- | ------ | ------ | ------ |
| userId  | Number | 用户id | 1      |
| goodsId | Number | 商品id | 1      |

respinse: JSON

| 属性名 | 类型   | 含义                     | 示例值   |
| ------ | ------ | ------------------------ | -------- |
| code   | Number | 200代表成功, 500代表失败 | 200      |
| msg    | String | 说明信息                 | 删除成功 |

### 清空购物车商品

+ url: api/server/clearCart.php
+ method: GET
+ query: 

| 属性名 | 类型   | 含义   | 示例值 |
| ------ | ------ | ------ | ------ |
| userId | Number | 用户id | 1      |

respinse: JSON

| 属性名 | 类型   | 含义                     | 示例值         |
| ------ | ------ | ------------------------ | -------------- |
| code   | Number | 200代表成功, 500代表失败 | 200            |
| msg    | String | 说明信息                 | 成功清空购物车 |

### 更新商品数量

+ url: api/server/updateCart.php
+ method: GET
+ query: 

| 属性名  | 类型   | 含义     | 示例值 |
| ------- | ------ | -------- | ------ |
| userId  | Number | 用户id   | 1      |
| goodsId | Number | 商品id   | 1      |
| num     | Number | 商品数量 | 2      |

respinse: JSON

| 属性名 | 类型   | 含义                         | 示例值   |
| ------ | ------ | ---------------------------- | -------- |
| code   | Number | 200代表修改成功, 500代表失败 | 200      |
| msg    | String | 说明信息                     | 修改成功 |