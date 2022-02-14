// 属性的简洁表示法
{
  const bar = 'bar';

  const o = {
    methodES5: function () {
      return 'methodES5 fun';
    },

    bar,
    method() {
      return 'method fun';
    },
  };

  console.log('o =>', o, o.method(), o.methodES5());
}

// 属性名表达式
// 属性名表达式和简写表示法，不能同时使用 // !
{
  const obj = {};

  obj.foo = 'foo';
  obj['b' + 'ar'] = 'bar';

  const obj2 = {
    foo2: 'foo2',

    ['b' + 'ar2']: 'bar2', // 字面量定义对象 // 1.es6支持 属性名表达式
    ['h' + 'ello']() {
      // 字面量定义对象 // 2.es6支持 属性名表达式
      return 'hello world';
    },
  };

  console.log(obj, obj2, obj2.hello());
}

// 方法的name属性 todo

// this =>  函数所在的当前对象
// super => 函数所在的当前对象的原型
{
  const proto = {
    foo: 'proto-value',
  };

  const obj = {
    foo: 'obj-value',
    find() {
      return super.foo; // （super 只能用在对象方法的简写表示法，才能被js引擎确认） // todo !! error
    },
  };

  Object.setPrototypeOf(obj, proto);

  console.log(obj, obj.find(), obj.find() === proto.foo);
}

// todo !! attention
{
  const proto = {
    x: 'proto-value',
    foo() {
      console.log('this 还是当前对象 =>', this.x);
    },
  };

  const obj = {
    x: 'obj-value',
    foo() {
      super.foo();
    },
  };

  Object.setPrototypeOf(obj, proto);

  obj.foo();
  console.log(obj);
}

// ... 用来解构赋值
// ... / Object.assign()  对目标对象 可枚举的/尚未被读取/自身属性  健/值拷贝（浅拷贝) // todo !!1.

// 等号右边是一个对象，如果是 undefined / null 会报错 // !
// ... 必须是最后一个参数（必须是变量名），否则会报错 // !
{
  const { x, y, ...c } = { x: 1, y: 2, z: 3, a: 4, b: 5 };
  console.log(x, y, c);

  {
    const o = Object.create({ x: 1, y: 2 });
    o.z = 3;

    const { x, ...newObj } = o; // x 解构赋值，可取继承的属性 // todo !!
    const { y, z } = newObj;

    console.log('x => ', x); // 1
    console.log('y => ', y); // undefined
    console.log('z => ', z); // 3
  }
}

// 用途
{
  // 1.浅拷贝（拷贝的是 源对象的 可枚举的自身属性）
  {
    const a = {
      key: 'value',
    };

    const target = { ...a };
    const target2 = Object.assign({}, a);

    console.warn('克隆对象 => ', target, target2);

    // ... 之后的{}, true, 1, null, undefined, 返回值没有自身属性，返回空对象 // todo !!
    {
      const o = { ...{}, ...true, ...1, ...null, ...undefined, a: 1 };
      console.warn('o => ', o);

      // 特例
      console.log('... 特例 =>', { ...'hel' });
      console.log({ ...['l', 'o'] });
    }

    {
      // 拷贝对象实例的属性 + 原型的属性
      const origin = {
        key: 'value',
      };

      Object.setPrototypeOf(origin, { isProto: true });

      const clone = {
        __proto__: Object.getPrototypeOf(origin),
        ...origin,
      };

      const clone2 = Object.assign(
        Object.create(Object.getPrototypeOf(origin)),
        origin,
      );

      const clone3 = Object.create(
        Object.getPrototypeOf(origin),
        Object.getOwnPropertyDescriptors(origin),
      );

      console.error('origin =>', origin);
      console.error('clone result =>', clone, clone2, clone3);
    }
  }

  // 2.用于对象的合并
  // 用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
  // 第一个参数是目标对象。
  {
    const a = { a: 'a' };
    const b = { b: 'b' };

    const ab = { ...a, ...b };
    const ab2 = Object.assign({}, a, b);
    console.log('合并对象 =>', ab, ab2);

    //
    const abc = { ...a, ...b, a: 'ab', b: 'ab', c: 'c' };
    const abc2 = Object.assign({}, a, b, { a: 'ab2', b: 'ab2', c: 'c2' });
    console.log('自定义属性值 覆盖 ... 的值 =>', abc, abc2);

    //
    const ac = { c: 'c', a: 'ainitial', ...a };
    const ac2 = Object.assign({}, { c: 'c2', a: 'ainitial2' }, a);
    console.log('自定义属性值 作为默认值 =>', ac, ac2);
  }

  //
  //
  // 3.为属性指定默认值
  {
    const DEFAULTS = {
      logLevel: 0,
      outputFormat: 'html',
    };

    const processContent = (options) => {
      console.log('copy before =>', options);

      options = Object.assign({}, DEFAULTS, options); // ! !

      console.log('copy after =>', options);
    };

    processContent();

    processContent({
      css: 'css',
    });
  }
}
