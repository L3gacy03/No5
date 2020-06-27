let box = document.querySelector('.cplist');
let dls = box.querySelectorAll('dl');
let data = [];
Array.from(dls).forEach((dl) => {
    let o = {};
    o.imgUrl = dl.querySelector('dt a img').src;
    o.title = dl.querySelector('.pro-name a').innerText;
    o.price = dl.querySelector('.pro-price span').innerText;
    o.discount = dl.querySelector('.zhekou').innerText;
    // console.log(o);
    data.push(o);
});
console.log(JSON.stringify(data));