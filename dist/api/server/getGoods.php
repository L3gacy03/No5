<?php

// 1、连接数据库
include_once "./connectDB.php";

// 多表查询
$sql = "SELECT * FROM goods";

$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);

?>