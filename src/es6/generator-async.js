// 编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。
{
}

// JavaScript 语言的 Thunk 函数
// Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数

// Thunk 函数现在可以用于 Generator 函数的自动流程管理
// Generator 函数可以自动执行，用 while 循环实现，但是，这不适合异步操作
{
  function run(fn) {
    // run 函数，就是一个 Generator 函数的自动执行器
    var gen = fn();

    function next(err, data) {
      var result = gen.next(data);
      if (result.done) {
        return;
      }
      result.value(next);
    }

    next();
  }

  function* g() {
    yield () => {
      console.log(1);
      //return 1;
    };
    yield () => {
      console.log(2);
      //return 2;
    };
    return;
  }

  run(g);
}

// co 模块可以自动执行 Generator 函数
// Generator 函数的 yield 命令后面，只能是 Thunk 函数或 Promise 对象

// 基于 Promise 对象的自动执行
{
  const fs = {
    readFile(fileName, callback) {
      //console.log(fileName, callback)
      callback();
    },
  };

  const readFile = function (fileName) {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, (error, data) => {
        if (error) {
          return reject(error);
        }
        // resolve(data);
        resolve(fileName);
      });
    });
  };

  const gen = function* (value) {
    const f1 = yield readFile('../assets/14.json');
    const f2 = yield readFile('../assets/15.json');
    console.warn(value, '----done---', f1, f2);
  };

  const g = gen('g');
  console.log('g.next() =>', g.next());
  g.next({ f1: 'f4' });
  g.next({ f2: 'f5' });

  // ! 手动执行其实就是用then方法，层层添加回调函数
  {
    const g2 = gen('g2');
    g2.next().value.then((data) => {
      g2.next(data).value.then((data2) => {
        g2.next(data2);
      });
    });
  }

  // ! best 写出一个自动执行器
  {
    function run(gen) {
      const g3 = gen('g3');

      function next(data) {
        var result = g3.next(data);
        if (result.done) {
          return result.value;
        }
        result.value.then((data) => {
          next(data);
        });
      }

      next();
    }

    run(gen);
  }
}
