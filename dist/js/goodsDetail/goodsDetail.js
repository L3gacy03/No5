define(["common", "jquery", "jquery-cookie"], function (common, $) {
    function bindEvent() {
        // 小图和大图的切换
        $('#picIdxBox').on('mousemove', 'li', function () {
            $(this).addClass('pic_on').siblings().removeClass('pic_on');
            $('#pic_box').find('img').hide().eq($(this).index()).show();
            $('#zoomBox .disBox img').hide().eq($(this).index()).show();
        });

        $('#pic_box').mouseenter(function () {
            $('#magnifier').add('#zoomBox').css({
                visibility: "visible"
            });
        }).mouseleave(function () {
            $('#magnifier').add('#zoomBox').css({
                visibility: "hidden"
            })
        });

        // 放大镜工具移动事件
        $('#pic_box').mousemove(function (e) {
            e = e || window.event;
            // e.pageX/e.pageY
            var l = e.pageX - $(this).offset().left - $('#magnifier').innerWidth() / 2;
            var t = e.pageY - $(this).offset().top - $('#magnifier').innerHeight() / 2;
            // 限定范围
            if(l < 0) l = 0;
            if(t < 0) t = 0;
            if(l > $(this).innerWidth() - $('#magnifier').innerWidth() -2){
                l = $(this).innerWidth() - $('#magnifier').innerWidth() - 2;
            }
            if(t > $(this).innerHeight() - $('#magnifier').innerHeight() -2){
                t = $(this).innerHeight() - $('#magnifier').innerHeight() - 2;
            }
            // 工具跟随鼠标在显示图中移动
            $('#magnifier').css({
                left: l,
                top: t
            });
            // 大图反方向两倍移动
            $('#zoomBox img').css({
                left: - l * 2,
                top: - t * 2
            });
        });

        // 商品数量添加和减少按钮
        let goodsNum = 1;
        $('#boxBuy span img:first').click(function () {
            goodsNum --;
            if(goodsNum < 1) goodsNum = 1;
            $('#buyAnt').val(goodsNum);
        });
        $('#boxBuy span img:last').click(function () {
            goodsNum ++;
            $('#buyAnt').val(goodsNum);
        });

        // 数量输入框的事件监听
        $('#buyAnt').change(function () {
            goodsNum = $(this).val();
            $('#buyAnt').val(goodsNum);
        })

        // 加入购物车功能
        $('#btnBuy').click(function () {
            let userId = $.cookie("userId") || "";
            let username = $.cookie("username") || "";
            let goodsId = $('#goodsId').attr('data-id');
            let num = $('#buyAnt').val();
            // 如果登录了(cookie中存在userId和username), 如果没登录(跳转到登录页面)
            if(userId && username){
                // 发送请求, 把用户id(userId)和商品id(goodsId)添加到购物车数据库
                $.ajax({
                    url: "../api/server/addCart_goodsDetail.php",
                    data: { userId, goodsId, num }
                }).done(data => {
                    // console.log("返回值", data);
                    common.getData(userId);
                    alert(data);
                });
            }else{
                location.replace('./login.html');
            }
        });
    }

    return {
        bindEvent
    }
});