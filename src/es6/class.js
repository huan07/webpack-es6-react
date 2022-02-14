{
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.toString = function () {
    return `(${this.x}, ${this.y})`;
  };

  const point = new Point(1, 2);
  console.warn('point =>', point);

  console.log(
    '区别1：es5 constructor 函数 默认不可枚举；其他原型方法 可枚举', // !
    Object.keys(Point.prototype),
    Object.getOwnPropertyNames(Point.prototype),
  );

  //
  {
    class Point {
      constructor(x, y) {
        // this => 实例对象
        this.x = x;
        this.y = y;
      }

      toString() {
        // 原型方法
        return `(${this.x}, ${this.y})`;
      }

      say = () => {
        // 实例方法
      };
    }

    const point = new Point(3, 4);
    console.warn('pointClass =>', point);

    console.log(
      typeof Point,
      Point.prototype.constructor === Point,
      point.constructor === Point,
    );

    console.log(
      '区别1：es6 原型方法 都是不可枚举的', // !
      Object.keys(Point.prototype),
      Object.getOwnPropertyNames(Point.prototype),
    );
  }

  //
  {
    class Bar {}

    class Foo {
      // constructor()函数返回一个全新的对象，结果导致实例对象不是Foo类的实例
      constructor() {
        return Object.create(null);
      }
    }

    const bar = new Bar();
    const foo = new Foo();

    console.log(bar, bar instanceof Bar);
    console.log(foo, foo instanceof Foo);

    // 区别2：es6 的类，必须用 new 调用，否则会报错
  }

  {
    class Foo {
      x = 'x';

      bar() {}
    }

    const foo = new Foo();
    console.log(
      '实例属性 or 原型属性 => ',
      foo.hasOwnProperty('x'),
      foo.hasOwnProperty('bar'),
      foo.__proto__.hasOwnProperty('bar'),
    );
  }

  // 取值函数（getter）和存值函数（setter）// todo ...
}

// Generator函数
{
  class Foo {
    constructor(...args) {
      console.warn('rest 参数，args =>', args);
      this.args = args;
    }

    *[Symbol.iterator]() {
      for (let arg of this.args) {
        yield arg;
      }
    }
  }

  const foo = new Foo(1, 2, 3, 4);
  const foo2 = new Foo(true, false);

  console.log([...foo], [...foo2]);
}

// 类的方法内部 this，默认指向类的实例
// 一旦单独使用该方法，很可能报错
{
  class Logger {
    printNameX(name = 'there') {
      this.printX(`hello, ${name}`);
    }

    printX(text) {
      console.error(text);
    }
  }

  const logger = new Logger();
  const { printNameX } = logger;
  logger.printNameX();
  // printNameX(); // ! 提取出来单独使用，this => 运行时所在的环境（严格模式，this => undefined）x

  // fixed1
  {
    class LoggerFixed {
      constructor() {
        // ! 1.构造函数中绑定this
        this.printName = this.printName.bind(this);
      }

      printName(name = 'there') {
        this.print(`hello, ${name}`);
      }

      print(text) {
        console.log(text);
      }
    }

    const logger = new LoggerFixed();
    const { printName } = logger;
    printName();
  }

  // fixed2
  {
    class LoggerFixed {
      // ! 2.箭头函数内部的 this 就是外层代码块（离得最近的外层非箭头函数）的 this
      printName = (name = 'there') => {
        this.print(`hello, ${name}`);
      };

      print(text) {
        console.log(text);
      }
    }

    const logger = new LoggerFixed();
    const { printName } = logger;
    printName();
  }

  // fixed3
  // 使用Proxy // todo ...
}

// 2.静态方法
{
  // 静态方法不会被实例继承，而是直接通过类来调用
  class Foo {
    static classMethod() {
      return '-hello-';
    }

    static bar() {
      this.baz(); // 静态方法内部的 this => 类，而不是实例 // !
    }

    static baz() {
      console.log('静态方法内部的this => 类', this);
    }

    baz() {
      console.log('this => 实例', this);
    }
  }

  console.warn('静态方法被调用');
  Foo.bar();
  Foo.baz();

  new Foo().baz();

  // 父类的静态方法，可以被子类继承
  {
    class FooChild extends Foo {}

    console.warn('父类的静态方法被子类继承');
    console.log(FooChild.classMethod());
    FooChild.bar(); // 内部的this => FooChild // todo !!
  }

  // 静态方法也是可以从 super 对象上调用的
  {
    class FooChild extends Foo {
      static classMethod() {
        return super.classMethod() + ', too';
      }

      static bar() {
        super.bar();
        console.log('super.bar(), too');
      }
    }

    console.log(FooChild.classMethod());
    FooChild.bar();
  }
}

// 实例属性的新写法：定义在类的头部，constructor函数之上
{
}

// 4.静态属性
{
}

// 5.私有方法和私有属性
{
}

// 6.静态块
{
}

// new.target（一般用在构造函数之中）// todo ...
// ES5 返回 new 命令作用于的那个构造函数
// ES6 Class 内部调用 new.target，返回当前 Class
{
  class Rectangle {
    constructor(length, width) {
      console.log(
        'new.target => ',
        new.target,
        new.target === Rectangle,
        new.target.name,
      );
      this.length = length;
      this.width = width;
    }
  }

  new Rectangle(3, 4);

  // 子类继承父类时，new.target返回子类
  {
    class Rectangle {
      constructor(name) {
        console.log('name new.target.name => ', name, new.target.name);
      }
    }

    class Square extends Rectangle {
      constructor(...args) {
        super(...args);
      }
    }

    new Rectangle('父类');
    new Square('子类');
  }

  // 用途
  // 写出不能独立使用、必须继承后才能使用的类
  {
    class Shape {
      constructor() {
        if (new.target === Shape) {
          throw new Error('本类不能实例化');
        }
      }
    }

    class Rectangle extends Shape {
      constructor() {
        super();
      }
    }

    new Shape();
    new Rectangle();
  }
}
