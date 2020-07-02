<?php

// 1、连接数据库
include_once "./connectDB.php";

$userId = $_REQUEST["userId"];

// 多表查询
$sql = "SELECT cart.*,goods.title,goods.imgUrl,goods.discount,goods.price FROM cart , goods WHERE cart.goodsId = goods.goodsId AND userId=$userId";

$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);
?>