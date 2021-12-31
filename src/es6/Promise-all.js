import getJSON from './foo/getJSON';

Promise.all([14, 14].map((item) => getJSON(`../assets/${item}.json`)))
  .then((v) => {
    console.log('         整体 fulfilled =>', v);
  })
  .catch((err) => {
    console.log(err);
  });

Promise.all([14, 152].map((item) => getJSON(`../assets/${item}.json`))).catch(
  (err) => {
    console.log('         有一个实例的状态 rejected , 整体 rejected =>', err); // ! bad
  },
);

{
  // 作为参数的 Promise 实例，
  // 1.自己定义了 catch 方法，那么它一旦被 rejected，并不会触发 Promise.all() 的 catch 方法 // ! good
  // 2.没有自己的 catch 方法，就会调用 Promise.all() 的 catch 方法
  const promiseItem = getJSON(`../assets/14.json`).then((v) => 'v');

  const promiseItem2 = getJSON(`../assets/152.json`).catch((err) => {
    // console.log(err);
    // !!!!
    // 因为 promiseItem2 首先会 rejected,
    // 但是它有自己的 catch 方法，执行完 catch 方法后，也会变成 resolved
    // return 'promiseItem2 catched';
  });

  console.warn('promiseItem, promiseItem2 =>', promiseItem, promiseItem2);

  Promise.all([promiseItem, promiseItem2]).then(([v, v2]) => {
    console.warn(v, v2);
  });
}
