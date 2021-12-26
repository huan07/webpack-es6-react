setTimeout(() => {
  console.log(14); // ! 互换下
}, 0);

new Promise((resolve, reject) => {
  console.log(11);
  resolve();
})
  .then((value) => {
    console.log(13);
  })
  .then((value) => {
    console.log(15); // ! 互换下
  });

console.log(12);
