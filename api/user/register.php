<?php

include('./config.php');

$account = $_POST['account'];
$pwd = $_POST['pwd'];

// 对数据库进行操作
$sql = "select * from user where account='$account'";

$res1 = mysql_query($sql);

// 判断是否已注册
if(mysql_num_rows($res1) > 0){
    // 查询到, 手机号已存在
    echo json_encode(array(
        'code' => 2,
        'msg' => '该手机号已注册, 请直接登录'
    ));
}else{
    // 查询不到, 手机号不存在
    // 对数据库进行操作: 把用户名和密码插入数据库的user表中
    $sql = "insert into user (account, pwd) values ('$account', '$pwd')";
    $res = mysql_query($sql);
    if($res){
        // 注册成功
        echo json_encode(array(
            'code' => 1,
            'msg' => '注册成功, 即将跳转到登录页面'
        ));
    }else{
        // 注册失败
        echo json_encode(array(
            'code' => 0,
            'msg' => '网络错误, 请重试'
        ));
    }
}


?>