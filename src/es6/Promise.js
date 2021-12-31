import getJSON from './foo/getJSON';

{
  function timeout(ms) {
    return new Promise((resolve, reject) => {
      // ! resolve 函数接受的参数，传递给 then 方法的回调函数
      setTimeout(resolve, ms, 'resolve-done-params');
    });
  }

  timeout(1000).then((value) => {
    console.warn('timeout value =>', value);
  });
}

// Promise 新建后就会立即执行。// ! 面试题目

// example
// 异步加载图片
{
  const loadImageAsync = function (url) {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = function () {
        resolve(image);
      };

      image.onerror = function () {
        reject(new Error('can not load image at ' + url));
      };

      image.src = url;
    });
  };
}

// Promise.prototype.then
// 返回的是新的 Promise 实例，可以链式调用
const ajaxInstance = getJSON('../assets/14.json');
{
  const p2 = ajaxInstance.then((v) => v); // !! 1.resolve 函数接受的参数，传递给 then 方法的回调函数

  const p3 = p2.then((v) => v); // !! 2.前面 then 方法的返回值，传递给 后面链式调用 then 方法的回调函数

  console.log(
    'ajaxInstance =>',
    ajaxInstance,
    ajaxInstance === p2,
    p2 === p3,
    p2,
    p3,
  );
}

// Promise.prototype.catch 方法是
// .then(null, rejection)或
// .then(undefined, rejection)的别名，
// 返回的是新的 Promise 实例 // !
//
//
//
// Promise 对象的错误具有 “冒泡”性质 ，会一直向后传递，直到被捕获为止。
// 也就是说，错误总是会被下一个 catch 语句捕获。(推荐用 catch 方法，不用 .then 方法的第二个参数) // ! good 捕获到错误后，下级then方法不去执行
// 其中可以是
// 1.产生 Promise 对象内部语法错误、
// 2.前一个回调函数运行时发生的错误
{
  const test = () => {
    ajaxInstance
      .then((v) => {
        a = a + 1;
        return 'a';
      })
      .then((v) => {
        b = b + 1;
        console.warn('b ==> ==> ==> ==> ==> ==> ==>'); // ! 不执行
        return 'b';
      }); // 没有 catch 错误，抛出错误，Promise 内部的错误不会影响到 Promise 外部的代码，
    // 通俗的说法就是“Promise 会吃掉错误”

    ajaxInstance
      .then((v) => {
        a2 = a2 + 2;
        return 'a2';
      })
      .then((v) => {
        b = b + 1;
        console.warn('b ==> ==> ==> ==> ==> ==> ==>'); // ! 不执行
        return 'b';
      })
      .catch((err) => {
        // ! good
        console.error('| | | | err “冒泡”性质 =>', err);
      });
  };

  test();
}

// Promise.prototype.finally()
// 不管 Promise 对象最后状态如何，都会执行的操作

// Promise.resolve(): 返回一个新的 Promise 实例
{
  const p = Promise.resolve('foo');
  const p_2 = new Promise((resolve) => resolve('foo'));
  console.log('Promise.resolve() p, p_2 =>', p, p_2);
}

// Promise.reject(): 返回一个新的 Promise 实例，实例的状态为 rejected
{
  const p = Promise.reject('error');
  const p_2 = new Promise((resolve, reject) => {
    reject(new Error('error'));
  });
  console.log('Promise.reject() p, p_2 =>', p, p_2);
}
