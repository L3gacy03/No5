<?php

// 1、连接数据库
include_once "./connectDB.php";

$sort = $_REQUEST["sort"];

if($sort == "default"){
    $sql = "SELECT * FROM goods ORDER BY goodsId";
}elseif($sort == "price_asc"){
    $sql = "SELECT * FROM goods ORDER BY price ASC";
}elseif($sort == "price_desc"){
    $sql = "SELECT * FROM goods ORDER BY price DESC";
}

$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

// 把数据转换为JSON数据返回
echo json_encode($data,true);

?>