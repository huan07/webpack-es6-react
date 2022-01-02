{
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    toString() {
      return JSON.stringify(this);
    }
  }

  class ColorPoint extends Point {
    constructor(x, y, color) {
      super(x, y); // 调用父类的constructor(x, y)
      this.color = color;
      // 在子类的构造函数中，只有调用 super 之后，才可以使用 this 关键字，否则会报错 // !
      // 或者，不需要 this，直接省略 constructor() 函数 // !
    }

    toString() {
      return super.toString() + ', ' + this.color; // 调用父类的toString()
    }
  }

  const point = new Point(1, 2);
  const colorPoint = new ColorPoint(11, 22, 'red');

  console.log(point, point.toString());
  console.log(colorPoint, colorPoint.toString());

  console.warn(
    'Object.getPrototypeof() =>',
    Object.getPrototypeOf(ColorPoint) === Point,
  );
}

// todo 后面继续看看
// super
// 1.作为函数时，只能用在子类的构造函数中
// 2.作为对象 // TODO ...
// 2.a.用在原型方法，=> 父类的原型对象
// 2.b.用在静态方法，=> 父类
{
  // example
  class A {
    constructor() {
      console.log('new.target =>', new.target);
    }
  }

  class B extends A {
    constructor() {
      super(); // 返回的是子类 B 的实例
    }
  }

  new A();
  new B();

  // example2
  {
    class A {
      constructor() {
        this.x = 1;
      }
    }

    class B extends A {
      constructor() {
        super();
        this.x = 2;
        super.x = 3; // TODO ?? attention
        console.log(this.x); // 3
        console.log(super.x); // undefined 父类的原型对象并没有 x 属性
      }
    }

    new B();
  }

  // 在子类的静态方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类，而不是子类的实例。
  {
    class A {
      static x = 0;

      constructor() {
        this.x = 11;
      }

      static print() {
        console.log('this.x => ', this.x);
        // todo attention 父类调用，this => 父类
        // todo attention 被子类继承，this => 子类，
      }
    }

    class B extends A {
      static x = 33;

      constructor() {
        super();
        this.x = 22;
      }

      static m() {
        super.print();
      }
    }

    A.print();
    B.m();
  }
}

// 类的 prototype 属性和 __proto__ 属性
{
  // Class 作为构造函数的语法糖，同时有
  // prototype 属性（在 es5 中，是构造函数的属性）和
  // __proto__ 属性（在 es5 中，是实例对象的属性）
  class A {}

  class B extends A {}

  console.warn('B =>', B);
  console.warn('A =>', A);

  // 表示构造函数的继承，总是指向父类（继承 父类的静态属性 ） // todo !!1.
  console.log('B.__proto__ === A =>', B.__proto__ === A);

  // 表示方法的继承，总是指向父类的 prototype 属性（继承 父类的原型属性 ） // todo !!2.
  console.log(
    'B.prototype.__proto__ === A.prototype =>',
    B.prototype.__proto__ === A.prototype,
  );

  // 子类继承 Object 类
  {
    class A extends Object {}

    console.log(A.__proto__, A.__proto__ === Object); // todo ?? false
    console.log(
      A.prototype.__proto__,
      A.prototype.__proto__ === Object.prototype,
    ); // todo ?? false
  }

  //
  {
    class AA {}

    console.log(AA.__proto__ === Function.prototype); // todo !!
    console.log(AA.prototype.__proto__ === Object.prototype); // todo !!
  }

  // 实例的 __proto__ 属性
  // 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性 // todo !!3.
  {
    let a = new A();
    let b = new B();

    console.log('b, a =>', b, a);
    console.log(b.__proto__.__proto__ === a.__proto__); // 实例对象的隐式原型 恒等于 构造函数的显式原型
    console.log(B.prototype.__proto__ === A.prototype);
  }
}

// 原生构造函数的继承
{
  // ES5，这些原生构造函数是无法继承的
  // 因为子类无法获得原生构造函数的内部属性，通过 Array.apply() 或者分配给原型对象都不行。
  // 原生构造函数会忽略 apply 方法传入的 this
  // ES6 允许继承原生构造函数定义子类
}

// Mixin 模式的实现
// Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口
{
  class Cat {
    type = 'cat-type';

    static color = 'white';

    eat() {
      console.log(`${this.type} is eating now`);
    }
  }

  class Dog {
    many = 2;

    static age = 5;

    run() {
      console.log(`${this.many} dogs is running now`);
    }
  }

  function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
      // console.log('key =>>', key);

      if (key !== 'prototype' && key !== 'constructor' && key !== 'name') {
        let desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      }
    }
  }

  function mix(...mixins) {
    class Mix {
      constructor() {
        for (let mixin of mixins) {
          copyProperties(this, new mixin()); // 拷贝实例属性
        }
      }
    }

    for (let mixin of mixins) {
      copyProperties(Mix, mixin); // 拷贝静态属性
      copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }

    return Mix;
  }

  {
    // test
    class Animal extends mix(Cat, Dog) {}

    console.warn('Animal =>', Animal);

    const animalInstance = new Animal();
    console.log('animalInstance =>', animalInstance);

    console.log(Animal.color, Animal.age);

    animalInstance.eat();
    animalInstance.run();
  }
}
