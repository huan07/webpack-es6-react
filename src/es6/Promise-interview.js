import getJSON from './foo/getJSON';
// todo
// https://www.bilibili.com/video/BV1ek4y1r7GT?p=4&spm_id_from=pageDriver

// TODO interview 考题1，Promise 对象实现指定执行顺序
{
  // 模拟异步操作
  {
    setTimeout(() => {
      console.log('1.异步');
    }, 3000);

    setTimeout(() => {
      console.log('2.异步');
    }, 2000);

    setTimeout(() => {
      console.log('3.异步');
    }, 1000);

    // todo 不管怎么调节代码顺序，最终输出结果总是3. 2. 1. 但是我们需要按照1. 2. 3.顺序执行，
    //   Promise 对象可以解决，then 链式调用。
  }

  // Promise 指定执行顺序
  {
    const p = new Promise((resolve, reject) => {
      setTimeout(() => {
        // console.log('1.异步')
        resolve('1.异步-指定执行顺序');
      }, 3000);
    });

    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        // console.log('2.异步')
        resolve('2.异步-指定执行顺序');
      }, 2000);
    });

    const p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        // console.log('3.异步')
        resolve('3.异步-指定执行顺序');
      }, 1000);
    });

    p.then((value) => {
      console.log(value);
      return p2;
    })
      .then((value) => {
        console.log(value);
        return p3;
      })
      .then((value) => {
        console.log(value);
      });
  }
}

// TODO interview 考题3，Promise 给某个异步请求设置超时时间 x
{
  const sleep = (timeout) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error(`请求已超时${timeout}秒`));
      }, timeout);
    });
  };

  Promise.race([sleep(5000), sleep(4000)])
    .then((v) => console.log('Promise.race then =>', v))
    .catch((err) => console.warn('Promise.race catch =>', err));
}

// TODO interview 考题4，手写 Promise.all x
{
  Promise.myAll = function (promises) {
    return new Promise((resolve, reject) => {
      promises = Array.from(promises);
      const len = promises.length;
      const result = [];

      promises.forEach((item) => {
        Promise.resolve(item)
          .then((value) => {
            result.push(value);

            if (result.length === len) {
              resolve(result);
            }

            console.log(value.response.data.id, Date.now());
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  };

  // test myAll
  Promise.myAll([14, 15].map((item) => getJSON(`../assets/${item}.json`))).then(
    (v) => {
      console.log('myAll 整体 fulfilled =>', v);
    },
  );

  Promise.myAll(
    [16, 162, 163].map((item) => getJSON(`../assets/${item}.json`)),
  ).catch((err) => {
    console.log('myAll 参数之一 rejected, 整体 rejected =>', err);
  });
}
