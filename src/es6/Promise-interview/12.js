setTimeout(function () {
  console.log(4);
});

Promise.resolve(function () {
  console.log('??'); // ? 因为没有then方法的回调函数接收它的参数
});

new Promise(function (resolve) {
  console.log(1);
  resolve();
}).then(function () {
  console.log(3);
});

console.log(2);
