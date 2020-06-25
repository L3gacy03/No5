<?php

// 连接数据库

// localhost 主机名
// root 用户名
// 密码为空, 如果有密码第三个参数写上密码(wamp密码为空, phpstudy密码为root)
mysql_connect('localhost', 'root', 'root');

// 选择数据库
mysql_select_db('meizu');

// 这两句设置编码, 直接使用
mysql_query('set charset "utf8"');
mysql_query('set character set "utf8"');

?>