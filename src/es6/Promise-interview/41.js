setTimeout(function () {
  console.log('最后之行');
});

const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve(4);
  console.log(2);
}).then((val) => {
  console.log(val);
});

promise.then(() => {
  console.log(5);
});

console.log(3);
