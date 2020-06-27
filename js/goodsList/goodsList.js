define(["jquery", "jquery-cookie"], function ($) {
    function goodsListRender() {
        $.ajax({
            type: "GET",
            url: "../api/getJSON/goodsList.php",
            success(data){
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
            error(err){
                console.log(err);
            }
        });
    }

    return {
        goodsListRender
    }
});