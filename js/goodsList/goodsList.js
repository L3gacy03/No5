define(["jquery", "jquery-cookie"], function ($) {
    function goodsListRender() {
        $.ajax({
            type: "GET",
            url: "../api/getJSON/goodsList.php",
            success(data) {
                // console.log(data);
                let html = data.map(item => {
                    return `
                    <dl>
                        <dt>
                            <a href="javascript:;">
                                <img src="${item.imgUrl}" width="200" height="200" />
                            </a>
                        </dt>
                        <dd class="pro-name">
                            <a href="javascript:;">${item.title}</a>
                        </dd>
                        <dd class="pro-price">
                            ￥<span>${item.price}</span>
                            <span class="zhekou">${item.discount}</span>
                        </dd>
                        <dd class="buybtn">
                            <a href="javascript:;" class="add">加入购物车</a>
                            <a href="javascript:;" class="shouc" pid="1530">收藏</a>
                        </dd>
                    </dl>
                    `;
                }).join('');
                $('#cplist').html(html);
            },
            error(err) {
                console.log(err);
            }
        });
    }

    function bindEvent() {
        // 左边商品分类导航栏
        $('#left-catnav').on('click', 'h3', function () {
            if ($(this).find('span').hasClass('open')) {
                $(this).find('span:first').removeClass('open').addClass('close');
                $(this).next().hide();
            } else {
                $(this).find('span:first').removeClass('close').addClass('open');
                $(this).next().show();
            }
        });

        // 点击更多, 显示更多商品品牌
        $('.more').click(function () {
            if($(this).text() == '更多'){
                $(this).text('收起');
                $('.brands').find('div').show();
            }else{
                $(this).text('更多');
                $('.brands div:eq(19)').nextAll().hide();
            }
        });
    }

    return {
        goodsListRender, bindEvent
    }
});