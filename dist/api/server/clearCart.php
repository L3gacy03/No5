<?php

// 连接数据库
include_once "./connectDB.php";

// 获取到用户id
$userId = $_REQUEST["userId"];

$sql = "DELETE FROM cart WHERE userId = $userId";
$result = mysqli_query($db,$sql);
if($result){
    // 删除成功
    echo json_encode(array(
        "code" => 200,
        "msg" => "成功清空购物车"
    ));
}else{
    // 删除失败
    echo json_encode(array(
        "code" => 500,
        "msg" => "网络错误, 请重试"
    ));
}

?>