define(["jquery", "jquery-cookie"], function ($) {
    function bindEvent() {
        // 小图和大图的切换
        $('#picIdxBox').on('mouseenter', 'li', function () {
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
    }

    return {
        bindEvent
    }
});