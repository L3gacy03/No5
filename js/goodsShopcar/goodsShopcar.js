define(["jquery", "jquery-cookie"], function ($) {
    function cartRender() {
        let userId = $.cookie("userId") || "";
        let username = $.cookie("username") || "";
        console.log(userId, username);

        // 如果有登录
        if(userId && username){
            $.ajax({
                url: "../api/server/getCart.php",
                data: { userId },
                dataType: "json"
            }).done(data => {
                // console.log(data);
                // console.log(data[0].title.split(" ")[1]);
                // console.log(data[0].price / data[0].discount.slice(1, -2) * 10 );
                let html = '';
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
                });
                $('#tbShoppingList').append(html);
            });
        }

    }

    return {
        cartRender
    }
});