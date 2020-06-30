<?php

include('./config.php');

// 连接数据库
$db = mysqli_connect("127.0.0.1", "root", "root", "no5");

$username = $_POST['username'];
$pwd = $_POST['pwd'];

// 查询数据库里是否存在用户名和密码一致的用户名
$sql = "select * from user where username='$username' and pwd='$pwd'";

$res = mysql_query($sql);

// 判断资源的长度大于0
if(mysql_num_rows($res) > 0){
    // 获取对应的id值
    $result = mysqli_query($db,$sql);
    $res1 = mysqli_fetch_all($result, MYSQLI_ASSOC)[0];
    $userId = $res1["Id"];
    // 登录成功
    echo json_encode(array(
        "code" => 1,
        "msg" => "登录成功, 即将跳转到首页",
        "userId" => $userId,
        "username" => $username,
        "pwd" => $pwd
    ));
}else{
    // 登录失败
    echo json_encode(array(
        "code" => 0,
        "msg" => "用户名或密码错误"
    ));
}

?>