let box = document.querySelector('#float-list');
let dls = box.querySelectorAll('dl');
let data = [];
Array.from(dls).forEach((dl) => {
    let o = {};
    o.id = dl.id;
    o.title = dl.querySelector('dt strong a').innerText;
    // sub1
    let sub1Data = [];
    Array.from(dl.querySelectorAll('dt p a')).forEach(a => {
        sub1Data.push(a.innerText);
    });
    o.sub1 = sub1Data;
    // nav2
    let nav2Data = [];
    Array.from(dl.querySelectorAll('.secondlist li')).forEach((li) => {
        let o = {};
        o.title2 = li.querySelector('strong a').innerText;
        // sub2
        let sub2Data = [];
        Array.from(li.querySelectorAll('.float-list-cont a')).forEach((a) => {
            sub2Data.push(a.innerText);
        });
        o.sub2 = sub2Data;
        nav2Data.push(o);
    });
    o.nav2 = nav2Data;
    // hotbrand
    let hotbrandData = [];
    Array.from(dl.querySelectorAll('.hotbrand li a')).forEach((a) => {
        hotbrandData.push(a.innerText);
    });
    o.hotbrand = hotbrandData;
    // imgUrl
    o.imgUrl = dl.querySelector('.hotbrand img').src;
    // console.log(o);
    data.push(o);
});
// console.log(data);
console.log(JSON.stringify(data));