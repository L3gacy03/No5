<?php

// 连接数据库
include_once "./connectDB.php";

// 获取到用户id和商品id
$goodsId = $_REQUEST["goodsId"];
$userId = $_REQUEST["userId"];
$num = $_REQUEST["num"];

/* 先检查当前的商品在购物车中是否已经存在，如果不存在那么就执行插入操作，否则应该执行修改的操作 num +1 */
$sql = "SELECT * FROM cart WHERE goodsId = $goodsId AND userId = $userId";
$result = mysqli_query($db,$sql);
$numRows = mysqli_num_rows($result);

if($numRows == 0){
    // 不存在, 添加数据
    $sql = "INSERT INTO cart " .
      "(cartId,goodsId,userId,num)" .
      "VALUES " .
      "(NULL,$goodsId,$userId,$num)";
}elseif($numRows == 1){
    // 存在
    $sql = "UPDATE cart SET num = num + $num WHERE goodsId = $goodsId AND userId = $userId";
}
  
  $retval = mysqli_query($db,$sql);
  
  if (!$retval) {
    die('添加到购物车失败: ' . mysqli_error($conn));
  }
  echo "商品已成功加入购物车！";

?>