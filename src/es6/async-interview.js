{
  async function foo() {
    console.log('第一题 1.foo start');
    await bar();
    console.log('第一题 4.foo end'); // await 命令之后的任务是 微任务
  }

  async function bar() {
    console.log('第一题 2.bar');
  }

  foo();

  console.log('第一题 3.start');
}

{
  async function foo2() {
    console.log('第二题 = = = = = 1');

    new Promise((resolve) => {
      console.log('第二题 = = = = = 2');
    });

    console.log('第二题 = = = = = 3');
  }

  foo2();

  console.log('第二题 = = = = = 4');
}

{
  async function foo3() {
    console.log('第三题 = = = = = = = = = = 1');
    await bar3();
    console.log('第三题 = = = = = = = = = = 4');
  }

  async function bar3() {
    setTimeout(() => {
      console.log('第三题 = = = = = = = = = = 5');
    }, 0);

    console.log('第三题 = = = = = = = = = = 2');
  }

  foo3();

  console.log('第三题 = = = = = = = = = = 3');
}

// https://www.bilibili.com/video/BV1ek4y1r7GT?p=4
// TODO ... 头条考题
{
  async function async1() {
    console.log('2 头条考题 async1 start');
    await async2();
    console.log('6   7 头条考题 async1 end'); // todo attention，await 命令之后的任务是 微任务
  }

  async function async2() {
    console.log('3 头条考题 async2');
  }

  console.log('1 头条考题 script start');

  setTimeout(() => {
    console.log('8 头条考题 setTimeout');
  }, 0);

  async1();

  new Promise((resolve) => {
    console.log('4 头条考题 promise1');
    resolve();
  }).then(() => {
    console.log('7   6 头条考题 promise2');
  });

  console.log('5 头条考题 script end');
}
