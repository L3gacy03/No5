define(["jquery", "jquery-cookie"], function () {
    // header & footer
    function common() {
        // 渲染商品导航栏
        $.ajax({
            type: 'GET',
            url: "./api/getJSON/goodsNavData.php",
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
                            <strong><a href="javascript:;">${dl.title}</a></strong>
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
        // console.log($(document));
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
    }


    return {
        common
    }
});