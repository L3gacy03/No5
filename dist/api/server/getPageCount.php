<?php

// 连接数据库
include_once "./connectDB.php";

// 获取页面商品数量
$size = 36;

// 页码数量: 商品的总数(108) / $size
$sql = "SELECT * FROM goods";
$result = mysqli_query($db,$sql);

$total = mysqli_num_rows($result);

// 计算页码数量
$num = ceil($total / $size);

echo $num;

?>