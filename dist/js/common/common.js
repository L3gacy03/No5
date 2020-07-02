define(["jquery", "jquery-cookie"], function ($) {
    // header & footer
    function common() {
        let username = $.cookie("username") || "";
        if (username) {
            // console.log(username);
            $('.head-welcome b').text(username);
            $('.head-welcome span').html('<a href="javascript:;" id="exit">[退出]</a>');
        } else {
            $('.head-welcome b').text('欢迎光临No5时尚广场');
        }
        // 点击退出时, 清空cookie
        $('#exit').click(function () {
            if (confirm('确认退出吗?')) {
                $.cookie('username', '', { expires: -1, path: '/' });
                $('.head-welcome b').text('欢迎光临No5时尚广场');
                $('.head-welcome span').html('[<a href="./html/login.html">登录</a>] [<a href="./html/register.html">免费注册</a>]');
                $('.shoplist').html("&nbsp;&nbsp;&nbsp;&nbsp;购物车中还没有商品，赶紧选购吧！");
                $('.trigger strong').text(0);
            }
        });

        // 渲染商品导航栏
        $.ajax({
            type: 'GET',
            url: "../api/getJSON/goodsNavData.php",
            success(data) {
                // console.log(data);
                // 总框架
                let html = "";
                data.forEach((dl) => {
                    // 一级导航菜单
                    let sub1 = dl.sub1.map(a => {
                        return `
                            <a href="javascript:;">${a}</a>
                        `;
                    }).join('');

                    // 二级导航菜单
                    let nav2 = "";
                    dl.nav2.forEach(li => {
                        let sub2 = li.sub2.map(a => {
                            return `
                                <a href="javascript:;">${a}</a>
                            `;
                        }).join('');
                        nav2 += `
                        <li>
                            <strong>
                                <a href="javascript:;">${li.title2}</a>
                            </strong>
                            <div class="float-list-cont">
                                ${sub2}
                            </div>
                        </li>
                        `;
                    });

                    // 推荐品牌
                    let hotbrand = dl.hotbrand.map(a => {
                        return `
                            <li><a href="javascript:;">${a}</a></li>
                        `;
                    }).join('');

                    html += `
                    <dl id="${dl.id}">
                        <dt>
                            <strong><a href="${dl.title == '面部护理' ? './goodsList.html' : 'javascript:;'}">${dl.title}</a></strong>
                            <p>
                                ${sub1}
                            </p>
                            <b class="arrow-right"></b>
                        </dt>
                        <dd style="display: none;">
                            <ul class="secondlist">
                                ${nav2}
                            </ul>
                            <div class="hotbrand">
                                <h4>推荐品牌</h4>
                                <ul>
                                    ${hotbrand}
                                </ul>
                                <a href="javascript:;">
                                    <img src="${dl.imgUrl}" width="200" height="187" />
                                </a>
                            </div>
                        </dd>
                    </dl>
                    `;
                });
                $('#float-list').append(html);
            },
            error(err) {
                console.log(err);
            }
        });

        // 商品导航栏移入移出
        $('#float-list').mouseenter(function () {
            $(this).find('dl').stop(true, true).slideDown(200);
        }).mouseleave(function () {
            $(this).find('dl').stop(true, true).slideUp(200);
        });
        $('#float-list').on('mouseenter', 'dl', function () {
            $(this).find('dt').addClass('hover');
            $(this).find('dd').show();
        }).on('mouseleave', 'dl', function () {
            $(this).find('dt').removeClass('hover');
            $(this).find('dd').hide();
        });

        // 二维码移入移出
        $('#qrcode-box').hover(function () {
            $('#mobile-menu').css({
                visibility: "visible"
            });
        }, function () {
            $('#mobile-menu').css({
                visibility: "hidden"
            });
        })

        // 滚动返回顶部
        $(document).scroll(function () {
            // 当鼠标滚动到header以下时, 显示返回顶部按钮
            scrollEvent();
        })
        scrollEvent();
        function scrollEvent() {
            if ($(window).scrollTop() >= $('#main-nav').offset().top) {
                $('#fs-toolbar1 .top').css({
                    visibility: "visible"
                });
            } else {
                $('#fs-toolbar1 .top').css({
                    visibility: "hidden"
                });
            }
        }
        // 点击返回顶部
        $('#fs-toolbar1 .top').click(function () {
            console.log($(window).scrollTop());
            $('body,html').animate({
                scrollTop: 0
            }, 100);
            return false;
        });

        // 点击email输入框, 清空输入框
        $('#email').focus(function () {
            if ($(this).val() == '请输入您的Email地址') {
                $(this).val('');
            }
        }).blur(function () {
            if ($('#email').val() == '') {
                $(this).val('请输入您的Email地址');
            }
        });

        // 点击搜索输入框, 清空输入框
        $('#search').focus(function () {
            if ($(this).val() == '护手霜') {
                $(this).val('');
            }
        }).blur(function () {
            if ($(this).val() == '') {
                $(this).val('护手霜');
            }
        });
        $('.del-keywords').click(function () {
            $('#search').val('');
        });
    }

    // 渲染购物车列表
    function shopcarRender() {
        let userId = $.cookie("userId") || "";
        let username = $.cookie("username") || "";
        // console.log(userId, username);

        if (userId && username) {
            getData(userId);
        }

        // 点击删除按钮, 删除商品数据
        $('.shoplist').on('click', '.pro-price a', function () {
            let goodsId = $(this).closest('dl').attr('data-id');
            // console.log($(this));
            if (confirm("确定删除吗?")) {
                $.ajax({
                    url: "../api/server/delCart.php",
                    data: { userId, goodsId }
                }).done(data => {
                    // console.log(data);
                    // 重新渲染数据
                    getData(userId);
                });
            }
        });
    }

    function getData(userId) {
        $.ajax({
            url: "../api/server/getCart.php",
            data: { userId },
            dataType: "json"
        }).done(data => {
            // console.log(data);
            let html = '<div class="goodslist">'
            html += data.map(item => {
                return `
                <dl data-id="${item.goodsId}">
                    <dt>
                        <a href="javascript:;">
                            <img src="${item.imgUrl}">
                        </a>
                    </dt>
                    <dd class="pro-name">
                        <a href="javascript:;">${item.title}</a>
                    </dd>
                    <dd class="pro-price">
                        ￥${item.price}×${item.num}<a href="javascript:;">删除</a>
                    </dd>
                </dl>
                `;
            }).join('');
            html += '</div>';
            let sum = 0;
            let goodsNum = 0;
            for (let i = 0; i < data.length; i++) {
                sum += data[i].price * data[i].num;
                goodsNum += parseInt(data[i].num);
            }
            html += `
                <div class="sum">
                    <p>共<b>${goodsNum}</b>件商品　　金额总计：<em>￥${sum}</em></p>
                    <a href="./goodsShopcar.html">去购物车结算</a>
                </div>
            `;
            $('.shoplist').html(html);
            // 更新购物车数量
            $('.trigger strong').text(goodsNum);
        });
    }


    return {
        common, shopcarRender, getData
    }
});