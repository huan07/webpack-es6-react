// 变量提升带来的问题
// ! 1.内层变量可能会覆盖外层变量
var myname = '极客时间';

function showName() {
  console.log('myname =>', myname); // undefined
  if (1) {
    var myname = '极客邦';
  }
  console.log(myname); // 极客邦
}

showName();

// ! 2.用来计数的循环变量泄露为全局变量
for (var i = 0; i < 7; i++) {
  console.log(i);
}

console.log(i);

//
// todo ...
// 变量提升，作用域
// https://time.geekbang.org/column/article/127495
function barB() {
  var myName = '极客世界';
  let test1 = 100;
  if (true) {
    let myName = 'Chrome浏览器';
    console.log('test =>', test); // 1
  }
}

function fooF() {
  var myName = '极客邦';
  let test = 2;
  {
    let test = 3;
    barB();
  }
}

var myName = '极客时间';
let myAge = 10;
let test = 1;
fooF();
