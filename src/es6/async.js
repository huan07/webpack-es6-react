import getJSON from './foo/getJSON';

// await 命令后面，可以是 Promise 对象和原始类型的值 // !2.
{
  function timeout(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
      console.warn('1');
    });
  }

  async function timeout2(ms) {
    await new Promise((resolve) => {
      setTimeout(resolve, ms);
      console.warn('2');
    });
  }

  async function asyncPrint(value, ms) {
    await timeout(ms); // ! 不要写同步的暂停函数。它会让你的程序卡死
    await timeout2(ms + 1000);
    console.log(value);
  }

  const promise = asyncPrint('hello world', 1000);
  console.log('promise =>', promise);
}

// async 函数的返回值是 Promise 对象，可以用 then 方法指定下一步的操作 // !1.

// 当函数执行的时候，一旦遇到 await 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句
{
  // async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数
  // todo !! !! 没有 return 语句，then 方法的回调函数接收到的参数是 undefined
  async function f() {
    return 'hello world';
  }

  const foo = f();

  foo.then((v) => {
    console.log('foo promise =>', foo);
    console.log('foo promise then v =>', v);
  });

  // async 函数内部抛出错误，会导致返回的 Promise 对象变为 reject 状态 // todo !!
  {
    async function f() {
      throw new Error('async 函数内部抛出错误');
    }

    const bar = f();

    bar.catch((err) => {
      console.log('bar promise =>', bar);
      console.log('bar promise catch err =>', err);
    });
  }
}

// await 命令
{
  // 实现休眠效果，让程序停顿指定的时间
  // example
  {
    function sleep(interval) {
      return new Promise((resolve) => {
        setTimeout(resolve, interval);
      });
    }

    async function one2FiveInAsync() {
      for (let i = 0; i <= 5; i++) {
        console.log(i);
        await sleep(1000);
      }
    }

    one2FiveInAsync();
  }

  // 任何一个 await 语句后面的 Promise 对象变为 reject 状态，那么整个 async 函数都会中断执行 // todo !!
  {
    async function f() {
      await Promise.reject('出错了');
      await Promise.resolve('hello world'); // 不会执行
    }

    f().catch((err) => {
      console.log('err => / / /', err);
    });

    // 希望即使前一个异步操作失败，也不要中断后面的异步操作
    // todo fixed
    {
      async function f() {
        try {
          await Promise.reject('出错了 2');
        } catch (e) {}
        return await Promise.resolve('hello world 2');
      }

      f().then((v) => {
        console.log('v2 => / / /', v);
      });
    }

    // todo fixed2
    {
      async function f() {
        await Promise.reject('出错了 3').catch((err) => {
          console.log('err3 => / / /', err);
        });
        await Promise.resolve('hello world 3');
      }

      f().then((v) => {
        console.log('v3 没有 return 语句，接收到的参数 undefined => / / /', v);
      });
    }
  }
}

// 错误处理 // todo !! !!
// 如果 await 后面的异步操作出错，那么等同于 async 函数返回的 Promise 对象被 rejected。
// 将 await 命令，放在 try…catch 代码块之中，
// 如果有多个 await 命令，可以统一放在 try…catch 结构中。

// 两个独立的异步操作（即互不依赖），被写成并发关系，可以使用 Promise.all() 方法
{
  // 同时触发写法1
  {
    async function f() {
      const [foo, bar] = await Promise.all([
        getJSON('../assets/14.json'),
        getJSON('../assets/14.json'),
      ]);

      console.warn('f =>', [foo, bar]);
    }

    f();
  }

  // 同时触发写法2
  {
    async function f() {
      let fooPromise = getJSON('../assets/14.json');
      let barPromise = getJSON('../assets/14.json');
      let foo = await fooPromise;
      let bar = await barPromise;

      console.log('f =>', [foo, bar]);
    }

    f();
  }

  //
  {
  }
}

// await 命令只能用在 async 函数之中，如果用在普通函数，就会报错 // TODO ...

// async 函数的实现原理 // TODO ...
// 将 Generator 函数和自动执行器，包装在一个函数里

// 与其他异步处理方法的比较

// 按顺序完成异步操作
const urls = ['../assets/14.json', '../assets/15.json', '../assets/16.json'];

{
  // Promise 写法
  {
    function logInOrder() {
      // 这个为啥是并发的  // todo ??
      const idPromises = urls.map((url) => {
        return getJSON(url).then((xhr) => xhr.response.data.id);
      });

      idPromises.reduce((chain, curr) => {
        return chain
          .then(() => curr)
          .then((id) => {
            console.log('Promise id 并发 并发 并发 ？？=>', id, Date.now());
          });
      }, Promise.resolve());
    }

    logInOrder();
  }

  // async / await 写法
  {
    // 继发执行（ 问题是所有远程操作都是继发，效率很差，非常浪费时间 ）
    async function logInOrder() {
      for (let url of urls) {
        const xhr = await getJSON(url);
        console.log('async id =>', await xhr.response.data.id, Date.now());
      }
    }

    logInOrder();

    // 并发执行
    {
      async function logInOrder() {
        const idPromises = urls.map(async (url) => {
          const xhr = await getJSON(url);
          return xhr.response.data.id;
        });

        for (let idPromise of idPromises) {
          console.log(
            'async id 并发 并发 并发 并发 并发 并发 并发 =>',
            await idPromise,
            Date.now(),
          );
        }
      }

      logInOrder();
    }
  }
}
