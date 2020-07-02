define(["common", "jquery", "jquery-cookie"], function (common, $) {
    // 购物车订单商品渲染
    function cartRender() {
        let userId = $.cookie("userId") || "";
        let username = $.cookie("username") || "";
        // console.log(userId, username);

        // 如果有登录
        if (userId && username) {
            getData(userId);
        }
    }

    // 事件绑定
    function bindEvent() {
        let userId = $.cookie("userId") || "";
        let username = $.cookie("username") || "";
        // console.log(userId, username);

        // 删除
        $('#tbShoppingList').on('click', 'td:last-child a', function () {
            let goodsId = $(this).closest('tr').attr('data-id');
            if (confirm("确定删除吗?")) {
                $.ajax({
                    url: "../api/server/delCart.php",
                    data: { userId, goodsId }
                }).done(resp => {
                    // console.log(resp);
                    // 重新渲染数据
                    getData(userId);
                });
            }
        });

        // 点击清空购物车
        $('#clearAll').click(function () {
            if (confirm("确定删除吗?")) {
                $.ajax({
                    url: "../api/server/clearCart.php",
                    data: { userId },
                    dataType: "json"
                }).done(data => {
                    // console.log(data);
                    // 重新渲染数据
                    getData(userId);
                });
            }
        });

        // 数量输入框失去焦点
        $('#tbShoppingList')
            .on('change', '.ctlAnt', function () {
                // 获取到value值, 把value值赋值到商品num, 并更新数据库
                if ($(this).val() == 0) $(this).val(1);
                let num = $.trim($(this).val());
                let goodsId = $(this).closest('tr').attr('data-id');
                $.ajax({
                    url: "../api/server/updataCart.php",
                    data: { userId, goodsId, num },
                    dataType: "json"
                }).done(resp => {
                    // console.log(resp);
                    alert(resp.msg);
                    getData(userId);
                });
            });
    }

    function getData(userId) {
        $.ajax({
            url: "../api/server/getCart.php",
            data: { userId },
            dataType: "json"
        }).done(data => {
            // console.log(data);
            // console.log(data[0].title.split(" ")[1]); 
            // console.log(data[0].price / data[0].discount.slice(1, -2) * 10 );
            let html = `
            <tr class="cart-tip">
                <td>序号</td>
                <td>商品名称</td>
                <td>规格</td>
                <td>一般价</td>
                <td>No5价</td>
                <td>数量</td>
                <td>付款小计</td>
                <td>转入收藏夹</td>
                <td>删除</td>
            </tr>
            `;
            let amount = 0;
            data.forEach((item, index) => {
                html += `
                <tr data-id="${item.goodsId}" class="gray-border">
                    <td>${index + 1}</td>
                    <td>
                        <div>
                            <a href="javascript:;">
                                ${item.title}
                            </a>
                        </div>
                    </td>
                    <td>${item.title.split(" ")[1]}</td>
                    <td>${Math.round(item.price / item.discount.slice(1, -2) * 10)}</td>
                    <td>${item.price}</td>
                    <td>
                        <input type="text" name="amount_${index + 1}" value="${item.num}" maxlength="3" class="ctlAnt antn" />
                    </td>
                    <td>${item.price * item.num}</td>
                    <td><a href="javascript:;">转入收藏夹</a>
                    </td>
                    <td><a href="javascript:;">删除</a></td>
                </tr>
                `;
                amount += item.price * item.num;
            });
            amount = '￥' + amount;
            amountUpdata(amount);
            $('#tbShoppingList').html(html);
        });
    }

    // 更新合计金额
    function amountUpdata(amount) {
        $('#numPM2').text(amount);
    }

    return {
        cartRender, bindEvent
    }
});