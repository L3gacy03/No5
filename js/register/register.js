define(["jquery", "jquery-cookie", "captcha"], function ($, captcha) {
    function bindEvent() {
        // $('#txtRegUserName').val('123qwe');
        // $('#txtRegPassword').val('123qwe');
        // $('#txtRePassword').val('123qwe');
        // $('#txtEmail').val('774187452@qq.com');

        // 用户名
        $('#txtRegUserName').focus(function () {
            verForm($(this), '3~30位, 由汉字、字母、数字、点、减号、下划线及"@"组成');
        }).blur(function () {
            // 用户名的长度应为3～30个字符之间(汉字占两个字符)！
            let reg = /^[@\u4E00-\u9FA5A-Za-z0-9_-]{3,30}$/;
            let val = $.trim($(this).val());
            if($(this).val() == ''){
                verForm($(this), '3~30位, 由汉字、字母、数字、点、减号、下划线及"@"组成');
            }
            verReg(reg, val, $(this), '用户名的长度应为3～30个字符之间(汉字占两个字符)！');
        });
        // 密码
        $('#txtRegPassword').focus(function () {
            verForm($(this), '6-16位, 建议使用字母、数字、特殊字符组合');
        }).blur(function () {
            // 密码的长度应该为6～16个字符之间！
            let reg = /^.{6,16}$/;
            let val = $(this).val();
            verReg(reg, val, $(this), '密码的长度应该为6～16个字符之间！')
        });
        // 重复密码
        $('#txtRePassword').focus(function () {
            verForm($(this), '');
        }).blur(function () {
            // 两次输入的密码不一致，请重新输入！
            if($(this).val() == $('#txtRegPassword').val() && $(this).val() != ''){
                $(this).siblings('.img_right').css({
                    display: "inline"
                })
            }else{
                verForm($(this), '两次输入的密码不一致，请重新输入！');
                $(this).siblings('.tip').addClass('reg_errmsg');
            }
            if($(this).val() == ''){
                verForm($(this), '请您再输一次密码！');
                $(this).siblings('.tip').addClass('reg_errmsg');
            }
        });
        // 电子邮件
        $('#txtEmail').focus(function () {
            verForm($(this), '');
        }).blur(function () {
            // 邮件地址的格式不正确，请您重新输入！
            let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            let val = $(this).val();
            verReg(reg, val, $(this), '邮件地址的格式不正确，请您重新输入！')
            if ($(this).val() == '') {
                verForm($(this), '请您输入邮件地址！');
                $(this).siblings('.tip').addClass('reg_errmsg');
            }
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
            // 自动触发标签的事件
            $('#txtVerifyCode').trigger('blur');
        });
        $('#txtVerifyCode').focus(function () {
            verForm($(this), '');
        }).blur(function () {
            if($(this).val() == imgCode){
                verForm($(this), '验证码正确');
                $(this).siblings('.tip').css({
                    color: "green"
                });
            }else{
                $(this).siblings('.tip').css({
                    color: ""
                });
                verForm($(this), '验证码错误, 请重新输入');
                $(this).siblings('.tip').addClass('reg_errmsg');
            }
            if($(this).val() == ''){
                verForm($(this), '请您输入验证码！');
                $(this).siblings('.tip').addClass('reg_errmsg');
            }
        });

        // 注册
        $('#btnUserRegSubmit').click(function () {
            $('#txtRegUserName,#txtRegPassword,#txtRePassword,#txtEmail,#txtVerifyCode').trigger('blur');

            if(!$('#frmUserRegister .tip').hasClass('reg_errmsg') && $('#reg-proto').is(':checked')){
                // 获取用户名和密码
                let user = {
                    username: $.trim($('#txtRegUserName').val()),
                    pwd: md5($.trim($('#txtRegPassword').val())).slice(0, 15),
                    email: $.trim($('#txtEmail').val())
                }
                // 发送ajax请求执行注册
                $.ajax({
                    type: "POST",
                    url: "../api/user/register.php",
                    data: user,
                    dataType: "json"
                }).done(data => {
                    // console.log(data);
                    if(data.code == 1){
                        alert(data.msg);
                        location.replace('./login.html');
                    }else if(data.code == 2){
                        alert(data.msg);
                    }else{
                        alert(data.msg);
                    }
                });
            }else if(!$('#reg-proto').is(':checked')){
                alert("请阅读并同意用户的注册协议!!!");
            }

            return false;
        })
    }

    function verForm(selector, msg) {
        selector.siblings('.tip').removeClass('reg_errmsg');
        selector.siblings('.tip').text(msg);
    }

    function verReg(reg, val, selector, msg) {
        if (reg.test(val)) {
            selector.siblings('.img_right').css({
                display: "inline"
            })
            selector.siblings('.tip').removeClass('reg_errmsg');
        } else {
            verForm(selector, msg);
            selector.siblings('.img_right').css({
                display: "none"
            })
            selector.siblings('.tip').addClass('reg_errmsg');
        }
    }

    return {
        bindEvent
    }
});