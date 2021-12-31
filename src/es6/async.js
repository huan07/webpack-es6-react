import getJSON from './foo/getJSON';

// async 函数的返回值是 Promise 对象，可以用 then 方法指定下一步的操作 // ! 1.
// await 命令后面，可以是 Promise 对象和原始类型的值 // ! 2.
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
    // console.warn('1');
  });
}

async function timeout2(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
    console.warn('2');
  });
}

{
  async function asyncPrint(value, ms) {
    await timeout(ms); // ! 不要写同步的暂停函数。它会让你的程序卡死
    await timeout2(ms + 1000);
    console.warn(value);
  }

  const promise = asyncPrint('hello world', 1000);
  console.error('promise =>', promise);
}

// async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数 // !
{
  async function f() {
    // return await 'hello';
    return 'world';
  }

  const foo = f();

  foo.then((v) => {
    console.log('foo promise =>', foo, v);
  });

  //
  {
    async function f() {
      throw new Error('async 函数内部抛出错误');
    }

    const bar = f();

    bar.catch((err) => {
      console.log('bar promise =>', bar, err);
    });
  }
}

// await 命令
{
  // example
  // 实现休眠效果，让程序停顿指定的时间
  {
    async function one2FiveInAsync() {
      for (let i = 0; i <= 5; i++) {
        console.log(i);
        await timeout(1000);
      }
    }

    one2FiveInAsync();
  }

  // 任何一个 await 语句后面的 Promise 对象变为 reject 状态，那么整个 async 函数都会中断执行 // !
  {
    async function f() {
      await Promise.reject('出错了');
      await Promise.resolve('hello world'); // 不会执行
    }

    f().catch((err) => {
      console.log('err => / / /', err);
    });

    // 希望即使前一个异步操作失败，也不要中断后面的异步操作
    // ! fixed
    {
      async function f() {
        try {
          await Promise.reject('出错了 2');
        } catch (e) {}
        return await Promise.resolve('hello world 2');
      }

      f().then((v) => {
        console.log('fixed => / / /', v);
      });
    }

    // ! fixed2
    {
      async function f() {
        await Promise.reject('出错了 3').catch((err) => {
          console.log('fixed2 err3 => / / /', err);
        });
        await Promise.resolve('hello world 3');
      }

      f().then((v) => {
        console.log(
          'fixed2 v3 没有 return 语句，接收到的参数值为undefined => / / /',
          v,
        );
      });
    }
  }
}

// 错误处理
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

      console.error('f =>', [foo, bar]);
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
}

// async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里

// 按顺序完成异步操作
const urls = ['../assets/14.json', '../assets/15.json', '../assets/16.json'];

// 多个异步操作 继发执行
{
  // Promise的写法 // ! 1.
  {
    function logInOrder() {
      // 远程读取所有URL
      const idPromises = urls.map((url) => {
        return getJSON(url).then((xhr) => xhr.response.data.id);
      });

      // 按次序输出
      idPromises.reduce((chain, curr) => {
        return chain
          .then(() => curr)
          .then((id) => {
            console.log(
              '多个异步操作 继发执行 Promise的写法 =>',
              id,
              Date.now(),
            );
          });
      }, Promise.resolve());

      // ? 为啥需要多写一层then
      idPromises.reduce((chain, curr) => {
        return chain.then(() => {
          console.error('? 为啥需要多写一层then =>', curr, Date.now());
        });
      }, Promise.resolve());
    }

    logInOrder();
  }

  // async函数的写法 // ! 2.
  {
    async function logInOrder() {
      for (const url of urls) {
        const xhr = await getJSON(url);
        console.log(
          '多个异步操作 继发执行 async函数的写法 =>',
          await xhr.response.data.id,
          Date.now(),
        );
      }
    }

    logInOrder();
  }
}

// 多个异步操作 并发执行
{
  async function logInOrder() {
    // 并发读取远程URL
    const idPromises = urls.map(async (url) => {
      const xhr = await getJSON(url);
      return xhr.response.data.id;
    });

    // 按次序输出
    for (const idPromise of idPromises) {
      console.log('多个异步操作 并发执行 =>', await idPromise, Date.now());
    }
  }

  logInOrder();
}
