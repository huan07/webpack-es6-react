// 函数参数的默认值
// 1.参数 === undefined, 默认值生效 // !
// 2.参数的默认值不是在定义时执行，而是在运行时执行 // !!
{
  // es5
  function log(x, y) {
    y = y || 'world';
    console.error(x, y);
  }

  // 赋值不起作用
  log('hello', '');
  log('hello', 0);
  log('hello', false);
  log('hello', null);

  // 没有赋值，用"world"，达到预期
  log('hello', undefined);

  // es6
  {
    function logFixed(x, y = 'world') {
      console.log(x, y);
    }

    // 符合预期
    logFixed('hello2', '');
    logFixed('hello2', 0);
    logFixed('hello2', false);
    logFixed('hello2', null);

    logFixed('hello2', undefined);
  }

  // 与解构赋值默认值结合
  {
    function foo({ x, y = 9 }) {
      console.warn('解构赋值默认值 =>', 'x =>', x, 'y =>', y);
    }

    foo({});
    foo({ x: 1 });
    foo({ x: 1, y: 2 });
    // foo(); // ! error undefined 不能转为 {}，解构失败

    {
      // ! 推荐使用 good
      function fooFixed({ x2, y2 = 99 } = {}) {
        console.log(
          '解构赋值默认值 + 函数参数默认值 =>',
          'x2 =>',
          x2,
          'y2 =>',
          y2,
        );
      }

      fooFixed({});
      fooFixed({ x2: 11 });
      fooFixed({ x2: 11, y2: 22 });
      fooFixed(); // 先看函数参数默认值，再看解构赋值默认值 // !
    }

    {
      // ! 推荐使用
      function m1({ x = 0, y = 0 } = {}) {
        console.log('m1 解构赋值默认值 推荐使用 =>', x, y);
      }

      function m2({ x2, y2 } = { x2: 0, y2: 0 }) {
        console.warn('m2 函数参数默认值 =>', x2, y2);
      }

      m1();
      m1({ x: 1 });
      m1({ y: 1 });
      m1({ x: 1, y: 1 });

      m2();
      m2({ x2: 2 });
      m2({ y2: 2 });
      m2({ x2: 2, y2: 2 });
    }
  }

  // 参数默认值的位置，建议尾参数 // !
  {
    function foof(x = 'x', y) {
      console.warn('foof params =>', x, y);
    }

    foof();
    // foof(, y); // ! error，需要显式undefined
    foof(undefined, 2);

    {
      // ! 推荐是用
      function barb(x, y = 'y') {
        console.log('barb params =>', x, y);
      }

      barb();
      barb(1);
      barb(1, 2);
    }
  }
}

// rest 参数 只能是最后一个参数
{
  function sortES5() {
    const args = Array.prototype.slice.call(arguments);
    args.sort(); // 转为字符串，按字典顺序逐位排序
    return args;
  }

  const sortES6 = (...numbers) => {
    return numbers.sort((a, b) => a - b); // 转为数字，升序排列
  };

  const arr = [1, 11, 2];
  const arr2 = ['1', '11', '2'];

  console.warn('rest =>');
  console.log(sortES5(...arr), sortES6(...arr));
  console.log(sortES5(...arr2), sortES6(...arr2));
}

// 5.箭头函数
{
  const f = (v) => v;
  console.error('f => 1', f(1));

  // 箭头函数没有参数，多个参数
  {
    const f = () => 2;
    console.log('f => 2', f());

    const ff = (num1, num2) => num1 + num2;
    const ff_2 = (num1, num2) => {
      // 没有返回值，{} 不可省略
      return num1 + num2;
    };

    console.log('ff => 3', ff(1, 2));
    console.log('ff_2 => 4', ff_2(1, 3));
  }

  // 箭头函数返回对象
  {
    const f = (x) => ({ x, y: x });
    console.log('f => {}', f(5));
  }

  // 与变量解构结合
  {
    const fullName = ({ firstName, lastName }) => `${firstName}, ${lastName}`;
    console.log('fullName =>', fullName({ firstName: 'Y', lastName: 'H' }));
  }

  // 与rest参数结合
  {
    const headAndTail = (head, ...tail) => ({ head, tail });
    console.log('headAndTail, tail is Array type =>', headAndTail(1, 2, 3, 4));
  }

  // 箭头函数
  // 函数体内的this对象，是定义时所在的对象，而不是运行时所在的对象 // !
  // 嵌套函数 箭头函数内部的 this 就是外层代码块（离得最近的外层非箭头函数）的 this。（沿着原型链查找的this ?） //!
  // arguments => 外层代码块的 arguments
  {
    function foo() {
      console.error('this outter => ', this); // foo 函数的 this
      setTimeout(() => {
        console.warn('this inner => ', this, this.ad); // 箭头函数，指向定义时 foo 函数的 this
      }, 1000);
    }

    var ad = 11;
    foo();

    foo.call({ ad: 88 });
    foo.call({ ad: 99 });

    // example
    {
      function Timer() {
        this.s1 = 0;
        this.s2 = 0;

        setInterval(() => this.s1++, 1000);

        setInterval(function () {
          this.s2++; // this => 运行时所在的作用域，window 对象
        }, 1000);
      }

      var timer = new Timer();
      setTimeout(() => {
        console.log(timer, timer.s1);
        console.log(window, window.s2); // NaN
      }, 3100);
    }
  }

  // example
  {
    function fooo() {
      return () => {
        return () => {
          console.log('多层嵌套函数 fooo =>', this, this.id);
        };
      };
    }

    var ff = fooo.call({ id: 'id1' }); // 决定了定义时的this
    var ff_2 = ff.call({ id: 'id2' })(); // 不改变内部this
    var ff_3 = ff().call({ id: 'id3' }); // 不改变内部this
  }

  // 3.不适用场合
  {
    // 1.定义对象的方法，方法内部包括this
    const cat = {
      lives: 9,
      jumps: () => {
        this.lives++; // 在全局环境定义的对象 ，this指向全局对象，// !
      },
    };
    cat.jumps();
    cat.jumps();
    console.log('lives =>', cat.lives, window.lives);
  }

  // 4.嵌套的箭头函数
  {
    // example
    // 部署管道机制：前一个函数的输出是后一个函数的输入  // 类似compose函数
    {
      const pipeline =
        (...funcs) =>
        (val) =>
          funcs.reduce((prev, curr) => curr(prev), val);

      const plus = (a) => a + 1;
      const mult = (a) => a * 2;

      const result = pipeline(plus, mult)(5);
      console.log(
        'pipeline result =>',
        result,
        pipeline(plus)(5),
        pipeline()(5),
      );
    }
  }
}
