<?php

// 连接数据库
$db = mysqli_connect("127.0.0.1", "root", "root", "no5");

if(!$db){
    die("连接错误: " . mysqli_error($db));
}

?>