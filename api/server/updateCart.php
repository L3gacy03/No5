<?php

// 连接数据库
include_once "./connectDB.php";

$userId = $_REQUEST["userId"];
$goodsId = $_REQUEST["goodsId"];
$num = $_REQUEST['num'];

$sql = "UPDATE cart SET num=$num WHERE userId=$userId AND goodsId=$goodsId";
$result = mysqli_query($db,$sql);
if($result){
    // 删除成功
    echo json_encode(array(
        "code" => 200,
        "msg" => "修改成功"
    ));
}else{
    // 删除失败
    echo json_encode(array(
        "code" => 500,
        "msg" => "网络错误, 请重试"
    ));
}

?>