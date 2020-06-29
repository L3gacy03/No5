define(["jquery", "jquery-cookie"], function ($) {
    function bindEvent() {
        $('#txtRegUserName').focus(function () {
            verForm($(this), '3~30位, 由汉字、字母、数字、点、减号、下划线及"@"组成');
        }).blur(function () {
            // 3~30位, 由汉字、字母、数字、点、减号、下划线及"@"组成
            let reg = /^[@\u4E00-\u9FA5A-Za-z0-9_-]{3,30}$/;
            let val = $.trim($(this).val());
            verReg(reg, val, $(this), '3~30位, 由汉字、字母、数字、点、减号、下划线及"@"组成');
        });
        $('#txtRegPassword').focus(function () {
            verForm($(this), '6-16位, 建议使用字母、数字、特殊字符组合');
        }).blur(function () {
            // 密码的长度应该为6～16个字符之间！
            let reg = /^.{6,16}$/;
            let val = $(this).val();
            verReg(reg, val, $(this), '密码的长度应该为6～16个字符之间！')
        });
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


        // 注册
        $('#btnUserRegSubmit').click(function () {

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