define(["common", "jquery", "jquery-cookie"], function (common, $) {
    // 商品渲染
    function goodsListRender() {
        $.ajax({
            url: "../api/server/getPageCount.php"
        }).done(size => {
            // 总页数
            // console.log(size);
            // 更新商品总数
            $('.total span strong').text(size * 36);
            // 更新总页数
            let pageSum = `<i>1</i>/${size}`;
            $('.mb').html(pageSum);
            // 渲染页数
            let page = '';
            for (let i = 0; i < size; i++) {
                page += `
                    <a href="javascript:;" class=${i == 0 ? "curr" : ""}>${i + 1}</a>
                `;
            }
            $('#prevBtn1').after(page);
        });
        changePage(1);
        addShopcar();
    }

    // 封装换页函数
    /**
     * @param   page    <number>    第几页
     */
    function changePage(page, sort = "default") {
        // 更改页面商品
        $.ajax({
            url: "../api/server/getGoods.php",
            data: { sort },
            dataType: "json",
            success(data) {
                // console.log(data);
                let html = '';
                // 1    1   36
                // 2    37  72
                let start = 36 * (page - 1);
                let end = 36 * page;
                for (let i = start; i < end; i++) {
                    html += `
                    <dl data-id="${data[i].goodsId}">
                        <dt>
                            <a href="${ data[i].goodsId == 1 ? './goodsDetail.html' : 'javascript:;'}">
                                <img src="${data[i].imgUrl}"/>
                            </a>
                        </dt>
                        <dd class="pro-name">
                            <a href="javascript:;">${data[i].title}</a>
                        </dd>
                        <dd class="pro-price">
                            ￥<span>${data[i].price}</span>
                            <span class="zhekou">${data[i].discount}</span>
                        </dd>
                        <dd class="buybtn">
                            <a href="javascript:;" class="add">加入购物车</a>
                            <a href="javascript:;" class="shouc" pid="1530">收藏</a>
                        </dd>
                    </dl>
                    `;
                }
                $('#cplist').html(html);
            },
            error(err) {
                console.log(err);
            }
        });
        // 更新页面数
        $('.mb i').text(page);
    }

    function bindEvent() {
        let page = 1;
        let sort = 'default';
        // 点击按默认/价格排序
        $('.filter dl').on('click', 'dd', function () {
            page = $('.inner a.curr').text();
            // console.log($(this).data().sort);
            $(this).addClass('curr').siblings('dd').removeClass('curr');
            sort = $(this).data().sort;
            changePage(page, sort);
        });
        // 点击第n页
        $('.inner').on('click', 'a', function () {
            // console.log($(this).text());
            page = $(this).text();
            changePage(page, sort);
            $(this).addClass('curr').siblings().removeClass('curr');
            // 处理下一页上一页按钮的状态
            // 页数
            let size = $('.inner a').size();
            if (page >= size) {
                page = size;
                $('#nextBtn').add('#nextBtn1').addClass('disa-btn');
            } else {
                $('#nextBtn').add('#nextBtn1').removeClass('disa-btn');
            }
            if (page <= 1) {
                page = 1;
                $('#prevBtn').add('#prevBtn1').addClass('disa-btn');
            } else {
                $('#prevBtn').add('#prevBtn1').removeClass('disa-btn');
            }
        });

        // 点击下一页
        $('#nextBtn').add('#nextBtn1').click(function () {
            let size = $('.inner a').size();
            page++;
            $('#prevBtn').add('#prevBtn1').removeClass('disa-btn');
            if (page >= size) {
                page = size;
                $('#nextBtn').add('#nextBtn1').addClass('disa-btn');
            }
            changePage(page, sort);
            $('.inner a').removeClass('curr').eq(page - 1).addClass('curr');
        });
        // 点击上一页
        $('#prevBtn').add('#prevBtn1').click(function () {
            page--;
            $('#nextBtn').add('#nextBtn1').removeClass('disa-btn');
            if (page <= 1) {
                page = 1;
                $('#prevBtn').add('#prevBtn1').addClass('disa-btn');
            }
            changePage(page, sort);
            $('.inner a').removeClass('curr').eq(page - 1).addClass('curr');
        });

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
            if ($(this).text() != '不限') {
                $('.more').hide();
            } else {
                $('.more').show();
            }
            const self = this;
            $.each($('.brands div'), function () {
                // console.log($(this).attr("elem-data"));
                if ($(self).text().includes($(this).attr("elem-data"))) {
                    $(this).show();
                } else if ($(self).text() == '不限') {
                    $('.more').text('更多');
                    $('.brands').find('div').show();
                    $('.brands div:eq(19)').nextAll().hide();
                } else {
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
            if (userId && username) {
                // 发送请求, 把用户id(userId)和商品id(goodsId)添加到购物车数据库
                $.ajax({
                    url: "../api/server/addCart.php",
                    data: { userId, goodsId }
                }).done(data => {
                    // console.log("返回值", data);
                    common.getData(userId);
                    alert(data);
                });
            } else {
                location.replace('./login.html');
            }
        });
    }

    return {
        goodsListRender, bindEvent
    }
});