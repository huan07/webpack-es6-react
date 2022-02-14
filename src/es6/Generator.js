import getJSON from './foo/getJSON';

// 不用 yield 表达式, 单纯的暂缓执行函数
{
  function* f() {
    console.log('执行了！');
  }

  var generator = f();

  setTimeout(() => {
    console.error('generator 暂缓 =>', generator);
    console.log('generator.next() =>', generator.next());
    console.log('[...f()] =>', [...f()]);
  }, 2000);
}

// 另外需要注意，yield 表达式只能用在 Generator 函数里面，用在其他地方都会报错
// * 数组扁平化，参照面试题

// yield 表达式如果用在另一个表达式之中，必须放在圆括号里面 // !
{
  function* demo() {
    console.error('hello ' + (yield));
    console.error('world ' + (yield 123)); // yield 表达式本身没有返回值，或者说总是返回 undefined // !
  }

  let generator = demo();

  generator.next();
  generator.next();
  generator.next(); // ? 需要3次next调用
}

// next方法可以带一个参数，该参数就会被当作 上一个yield表达式的返回值

// yield* 表达式：返回的是一个 遍历器对象
// 用来在 Generator 函数内部，调用另一个 Generator 函数
{
  function* inner() {
    yield 'hello';
  }

  function* outer1() {
    yield 'open';
    yield inner();
    yield 'close';
  }

  function* outer2() {
    yield 'open';
    yield* inner();
    yield 'close';
  }

  console.warn('yield* =>');
  for (let i of outer1()) {
    console.log('i => ', i);
  }

  for (let i2 of outer2()) {
    console.log('i2 => ', i2);
  }

  // 应用
  // yield* 命令可以很方便地取出嵌套数组的所有成员
  // * 数组扁平化，参照面试题

  // 使用yield*语句遍历完全二叉树 // todo ...
}

// Generator 函数的 this // todo ...
{
}

// Generator 与状态机
{
  var clock = function* () {
    while (true) {
      console.log('Tick!');
      yield;
      console.log('Tock!');
      yield;
    }
  };

  var clockGen = clock();
  clockGen.next();
  clockGen.next();
  clockGen.next();
}

// 应用
{
  const url = '../assets/14.json';

  // 异步操作的同步化表达
  {
    function request(url) {
      getJSON(url).then((xhr) => {
        console.warn('1. xhr =>', xhr);
        it.next(xhr.response); // todo 不是很好理解呢 ？
      });
    }

    function* main() {
      const json = yield request(url);
      console.warn('2. json =>', json);
    }

    const it = main();
    it.next();
  }

  // 异步任务的封装 // ! good
  {
    function* gen() {
      var json = yield getJSON(url);
      console.log('12. gen json =>', json);
    }

    const g = gen();
    const result = g.next();

    // result.value 是 Promise 对象
    console.log('11. gen result.value =>', result.value);
    result.value
      .then((xhr) => xhr.response)
      .then((json) => {
        g.next(json);
      });
  }

  // 控制流管理

  // 部署 Iterator 接口

  // 作为数据结构
}
