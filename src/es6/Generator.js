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
  }, 2000);

  // 另外需要注意，yield 表达式只能用在 Generator 函数里面，用在其他地方都会报错
  {
    var flat = function* (a) {
      for (var i = 0; i < a.length; i++) {
        const item = a[i];
        if (Array.isArray(item)) {
          yield* flat(item);
        } else {
          yield item;
        }
      }
    };

    var arr = [1, [2, 3, [4, 5, 6]]];

    for (let item of flat(arr)) {
      console.log('flat item =>', item);
    }

    console.log('flatGen =>', flat(arr));
    console.log('flatArray =>', [...flat(arr)]);
  }

  // yield 表达式如果用在另一个表达式之中，必须放在圆括号里面 // todo !!
  {
    function* demo() {
      console.log('hello ' + (yield));
      console.log('world ' + (yield 123)); // yield 表达式本身没有返回值，或者说总是返回 undefined // TODO !!1.
    }

    let generator = demo();

    generator.next();
    generator.next();
    generator.next();
  }
}

// next 方法的参数
// 被当作  上一个 yield 表达式  的返回值 // TODO !!2.
// 从语义上讲，第一个 next 方法用来启动遍历器对象，所以不用带有参数

// Generator.prototype.throw() // TODO ...

// Generator.prototype.return() // TODO ...

// yield* 表达式：返回的是一个遍历器对象
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

  // yield* 命令可以很方便地取出嵌套数组的所有成员
  {
    function* iterTree(tree) {
      // ! 推荐
      if (Array.isArray(tree)) {
        for (let i = 0; i < tree.length; i++) {
          yield* iterTree(tree[i]);
        }
      } else {
        yield tree;
      }
    }

    const arr = [1, [2, 3, [4, 5, 6]]];

    for (let item of iterTree(arr)) {
      console.log('iterTree item =>', item);
    }

    console.log('flatArray =>', [...iterTree(arr)]); // ! good 嵌套的数组扁平化
  }

  // 使用yield*语句遍历完全二叉树 // TODO ...
}

// Generator 函数的 this // TODO ...
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

// Generator 与协程 // TODO ...

// Generator 与上下文

// 应用
{
  const url = '../assets/14.json';

  // 异步操作的同步化表达
  {
    function request(url) {
      getJSON(url).then((xhr) => {
        console.log('1. xhr =>', xhr);
        it.next(xhr.response);
        // !
        //  next 方法的参数，被当作  上一个 yield 表达式  的返回值
        //  调用 next 方法时再往后执行
      });
    }

    function* main() {
      const json = yield request(url);
      console.log('2. json =>', json);
    }

    const it = main();
    it.next();

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
  }

  // 控制流管理

  // 部署 Iterator 接口

  // 作为数据结构
}
