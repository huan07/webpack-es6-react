// Promise 新建后就会立即执行。// !
const promise = new Promise((resolve, reject) => {
  // 同步
  resolve(); // 调用resolve或reject并不会终结 Promise 的参数函数的执行
  console.warn('1. new Promise 构造函数立即执行');
});

promise.then(() => {
  // 回调函数属于异步任务，微任务
  console.warn('3. then方法的 回调函数');
});

console.warn('2. hi', promise);

// 题目二
{
  setTimeout(function () {
    // 下一轮宏任务
    console.log('3');
  }, 0);

  Promise.resolve()
    .then(() => {
      // 微任务
      console.log('2');
    })
    .then(() => {
      console.error('22');
    });

  console.log('1'); // 同步任务
}
