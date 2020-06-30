define(["jquery", "jquery-cookie"], function ($) {
    function cartRender() {
        let userId = $.cookie("userId") || "";
        let username = $.cookie("username") || "";
        console.log(userId, username);
    }

    return {
        cartRender
    }
});