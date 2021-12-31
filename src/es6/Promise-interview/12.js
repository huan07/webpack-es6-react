setTimeout(function () {
  console.log(4);
});

Promise.resolve(function () {
  console.log('??'); // ? 因为没有then方法的回调函数接收它的参数，而且使用方式不对啊
});

new Promise(function (resolve) {
  console.log(1);
  resolve(); // 调用resolve或reject并不会终结 Promise 的参数函数的执行
}).then(function () {
  console.log(3);
});

console.log(2);
