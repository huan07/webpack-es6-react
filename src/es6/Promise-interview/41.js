setTimeout(function () {
  console.log('ζεδΉθ‘');
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
