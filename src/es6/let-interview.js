// 变量提升带来的问题
// ! 1.变量容易在不被察觉的情况下被覆盖掉
var myname = '极客时间';

function showName() {
  console.log('showName =>', myname); // undefined
  if (0) {
    var myname = '极客邦';
  }
  console.log(myname); // undefined
}

showName();

// ! 2.本应销毁的变量没有被销毁
function foo() {
  for (var i = 0; i < 7; i++) {}
  console.log(i);
}

foo();

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

// var命令会添加作为执行上下文的属性
var a__ = 'var';
{
  let l = 'let';
  const c = 'const';
}

console.log('window.prop =>', window, window.a__, window.l, window.c);
console.log(a__);
