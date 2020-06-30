<?php

// 连接数据库
include_once "./connectDB.php";

// 获取到用户id和商品id
$goodsId = $_REQUEST["goodsId"];
$userId = $_REQUEST["userId"];

/* 先检查当前的商品在购物车中是否已经存在，如果不存在那么就执行插入操作，否则应该执行修改的操作 num +1 */
$sql = "SELECT * FROM cart WHERE goodsId = $goodsId AND userId = $userId";
$result = mysqli_query($db,$sql);
$num = mysqli_num_rows($result);

if($num == 0){
    $sql = "INSERT INTO cart " .
      "(cartId,goodsId,userId,num)" .
      "VALUES " .
      "(NULL,$goodsId,$userId,1)";
  
  }elseif($num == 1){
    $sql = "UPDATE cart SET num = num +1 WHERE goodsId = $goodsId AND userId = $userId";
  }
  
  $retval = mysqli_query($db,$sql);
  
  if (!$retval) {
    die('添加到购物车失败: ' . mysqli_error($conn));
  }
  echo "已成功加入购物车！";

?>