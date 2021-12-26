// reject 参数
// 1.Error 对象的实例

// resolve 参数
// 1.正常值 ( Promise 实例也是一种正常值 )

// p1 的状态(rejected)决定了 p3 的状态 // !
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('p1 字符串'));
  }, 3000);
});

p1.catch((e) => console.warn('p1 =>', e, p1)); // 执行到catch方法的回调函数，没毛病

const p3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(p1); // !
  }, 1000);
});

p3.catch((e) => console.log('p3 =>', e, p3)); // 也是执行到catch方法的回调函数，// !

{
  // p2 的状态(fulfilled)决定了 p4 的状态
  const p2 = new Promise((resolve) => {
    setTimeout(resolve, 3000, 'p2 字符串');
  });

  p2.then((value) => console.warn('p2 =>', value, p2));

  const p4 = new Promise((resolve) => {
    setTimeout(resolve, 1000, p2);
  });

  p4.then((value) => console.log('p4 =>', value, p4));
}
