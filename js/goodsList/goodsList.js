define(["common", "jquery", "jquery-cookie"], function (common, $) {
    // 商品渲染
    function goodsListRender() {
        $.ajax({
            type: "GET",
            url: "../api/getJSON/goodsList.php"
        }).done(data => {
                // console.log(data);
                let html = data.map((item, index) => {
                    return `
                    <dl data-id="${item.goodsId}">
                        <dt>
                            <a href="${index == 0 ? './goodsDetail.html' : 'javascript:;'}">
                                <img src="${item.imgUrl}"/>
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
                addShopcar();
            }
        );
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
            if ($(this).text() == '更多') {
                $(this).text('收起');
                $('.brands').find('div').show();
            } else {
                $(this).text('更多');
                $('.brands div:eq(19)').nextAll().hide();
            }
        });

        // 点击筛选
        $('#brand-box .zm').click(function () {
            $(this).addClass('curr').siblings().removeClass('curr');
            if($(this).text() != '不限'){
                $('.more').hide();
            }else{
                $('.more').show();
            }
            const self = this;
            $.each($('.brands div'), function () {
                // console.log($(this).attr("elem-data"));
                if($(self).text().includes($(this).attr("elem-data"))){
                    $(this).show();
                }else if($(self).text() == '不限'){
                    $('.more').text('更多');
                    $('.brands').find('div').show();
                    $('.brands div:eq(19)').nextAll().hide();
                }else{
                    $('.more').text('更多');
                    $(this).hide();
                }
            });
        });
    }

    // 点击加入购物车
    function addShopcar() {
        $('#cplist').on("click", '.add', function () {
            // console.log($(this));
            let userId = $.cookie("userId") || "";
            let username = $.cookie("username") || "";
            let goodsId = $(this).closest('dl').attr('data-id');
            // console.log(userId, username, goodsId);

            // 如果登录了(cookie中存在userId和username), 如果没登录(跳转到登录页面)
            if(userId && username){
                // 发送请求, 把用户id(userId)和商品id(goodsId)添加到购物车数据库
                $.ajax({
                    url: "../api/server/addCart.php",
                    data: { userId, goodsId }
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
        goodsListRender, bindEvent
    }
});