define(["jquery", "jquery-cookie", "captcha"], function ($, captcha) {
    function bindEvent() {
        $('.fixlogininput:first').val('123qwe');
        $('.fixlogininput:last').val('123qwe');

        $('.fixlogininput:first').focus(function () {
            $(this).siblings('.tip').text('').removeClass('reg_errmsg');
        });
        $('.fixlogininput:last').focus(function () {
            $(this).siblings('.tip').text('').removeClass('reg_errmsg');
        });
        // 验证码
        let imgCode;
        let captcha = new Captcha({
            lineWidth: 1,   //线条宽度
            lineNum: 5,       //线条数量
            dotR: 2,          //点的半径
            dotNum: 10,       //点的数量
            preGroundColor: [10, 80],    //前景色区间
            backGroundColor: [150, 250], //背景色区间
            fontSize: 70,           //字体大小
            fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'],  //字体类型
            fontStyle: 'stroke',      //字体绘制方法，有fill和stroke
            content: '0123456789',  //验证码内容
            length: 4    //验证码长度
        });
        // 传值
        captcha.draw(document.querySelector('#captcha'), r => {
            console.log('验证码', r);
            imgCode = r;
        });
        $('.testcode').focus(function () {
            $(this).siblings('.tip').text('').removeClass('reg_errmsg');
        });

        // 登录按钮
        $('#btnLogin').click(function () {
            if ($('.fixlogininput:first').val() == '') {
                $('.fixlogininput:first').siblings('.tip').text('请您输入用户名！').addClass('reg_errmsg');
            } else {
                $('.fixlogininput:first').siblings('.tip').text('').removeClass('reg_errmsg');
            }
            if ($('.fixlogininput:last').val() == '') {
                $('.fixlogininput:last').siblings('.tip').text('请您输入密码！').addClass('reg_errmsg');
            } else {
                $('.fixlogininput:last').siblings('.tip').text('').removeClass('reg_errmsg');
            }
            if ($('.testcode').val() == '') {
                $('.testcode').siblings('.tip').text('请您输入验证码！').addClass('reg_errmsg');
            } else if ($('.testcode').val() != imgCode) {
                $('.testcode').siblings('.tip').text('验证码输入错误！').addClass('reg_errmsg');
            }
            else {
                $('.testcode').siblings('.tip').text('').removeClass('reg_errmsg');
            }

            if (!$('#frmUserLogin .tip').hasClass('reg_errmsg')) {
                let user = {
                    username: $.trim($('.fixlogininput:first').val()),
                    pwd: md5($.trim($('.fixlogininput:last').val())).slice(0, 15)
                }
                $.ajax({
                    type: "POST",
                    url: "../api/user/login.php",
                    data: user,
                    dataType: "json"
                }).done(data => {
                    console.log(data);
                    // if (data.code == 1) {
                    //     // 在登录页面存cookie
                    //     // 如果选了记住登录状态
                    //     if ($('#noLogin').is(":checked")) {
                    //         $.cookie('username', user.username, {
                    //             expires: 7,
                    //             path: '/'
                    //         });
                    //     } else {
                    //         $.cookie('username', user.username, {
                    //             path: '/'
                    //         });
                    //     }
                    //     alert(data.msg);
                    //     location.replace('../index.html');
                    // } else {
                    //     alert(data.msg);
                    // }
                });
            }

            return false;
        });
    }

    return {
        bindEvent
    }
});