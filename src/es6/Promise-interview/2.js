// 补充的，中断 Promise 链

const p = new Promise((resolve) => resolve('中断 Promise 链 => then1'))
  .then((v) => {
    console.log(v);
    return '中断 Promise 链 => then2';
  })
  .then((v) => {
    console.log(v);
  });

{
  const p = new Promise((resolve) => resolve('中断 Promise 链 => then1_2'))
    .then((v) => {
      console.log(v);
      return '中断 Promise 链 => then2_2';
    })
    .then((v) => {
      // ! 返回一个 pending 状态的 Promise 实例，中断 Promise 链
      return new Promise(() => {});
    })
    .then((v) => {
      console.log(v);
    });
}
