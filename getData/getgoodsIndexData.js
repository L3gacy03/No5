let ul = document.querySelector('#brand-list');
let lis = ul.querySelectorAll('li');
let data = [];
Array.from(lis).forEach((li) => {
    let o = {};
    o.itemId = li.getAttribute("item-id");
    o.itemIndex = li.getAttribute("item-index");
    o.title = li.querySelector('div p').innerText;
    o.smallimgUrl = li.querySelector('.small').src;
    o.bigimgUrl = li.querySelector('.big').src;
    // console.log(o);
    data.push(o);
});
console.log(JSON.stringify(data));