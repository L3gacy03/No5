<?php

// 连接数据库
include_once "./connectDB.php";

// 获取到用户id和商品id
$goodsId = $_REQUEST["goodsId"];
$userId = $_REQUEST["userId"];

// 删除该条用户id和商品id对应的数据
$sql = "DELETE FROM cart WHERE goodsId = $goodsId AND userId = $userId";
$result = mysqli_query($db,$sql);
if($result){
    // 删除成功
    echo json_encode(array(
        "code" => 200,
        "msg" => "删除成功"
    ));
}else{
    // 删除失败
    echo json_encode(array(
        "code" => 500,
        "msg" => "网络错误, 请重试"
    ));
}

?>