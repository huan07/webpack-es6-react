// 对象的属性名有两种类型
// 1.字符串
// 2.Symbol 类型，独一无二的值，不会与其他属性名产生冲突
{
  let s = Symbol();
  console.log(s, typeof s);
}
{
  let s = Symbol('foo');
  console.log(s);
}
{
  let s = Symbol({
    toString() {
      return '调用对象toString方法的返回值';
    },
  });
  console.log(s);
}

// Symbol 值不能与其他类型的值进行运算，会报错
// Symbol 值可以显式转为字符串，可以转为布尔值，不能转为数值

// Symbol值作为属性名时，该属性还是公开属性，不是私有属性
{
  let symbolName = Symbol();

  let a = {};
  a[symbolName] = 'hello';

  let a2 = {
    [symbolName]: 'hello',
  };

  let a3 = {};
  Object.defineProperty(a3, symbolName, { value: 'hello' });

  console.log(a, a2, a3);
}

// 实例：消除魔术字符串
{
  const shapeType = {
    triangle: Symbol(),
    rectangle: Symbol(),
  };

  function getArea(shape, options) {
    let area = 0;

    switch (shape) {
      case shapeType.triangle:
        area = 0.5 * options.width * options.height;
        break;
      case shapeType.rectangle:
        area = options.width * options.height;
        break;
      default:
        break;
    }

    return area;
  }

  const triangleArea = getArea(shapeType.triangle, { width: 20, height: 10 });
  const xArea = getArea(shapeType.x, { width: 20, height: 10 });
  console.log('triangleArea, xArea =>', triangleArea, xArea);
}

// Object.getOwnPropertySymbols()
{
  const obj = {
    fooBar: '1',
    [Symbol('fooBar')]: '3',
  };

  Object.defineProperty(obj, 'fooBarUenum', {
    value: '2',
    enumerable: false,
  });

  Object.defineProperty(obj, Symbol('fooBarUenum'), {
    value: '4',
    enumerable: false,
  });

  console.warn('obj =>', obj);

  for (let key in obj) {
    console.log('遍历 可枚举 自身 + 继承 属性 =>', key);
  }

  const keys = Object.keys(obj);
  console.error('对象 可枚举 实例属性 keys =>', keys);

  const names = Object.getOwnPropertyNames(obj);
  console.log('对象 可枚举＋不可枚举 自身属性 names =>', names);

  const symbols = Object.getOwnPropertySymbols(obj);
  console.log('对象 可枚举＋不可枚举 Symbol属性 symbols =>', symbols);

  const allKeys = Reflect.ownKeys(obj);
  console.log('实例 + Symbol属性 allKeys =>', allKeys);
}

// Symbol.for()，Symbol.keyFor()
{
  let s1 = Symbol.for('foo'); // ! 被登记在全局环境中供搜索
  let s2 = Symbol.for('foo');
  console.log(s1 === s2, Symbol.keyFor(s1), Symbol.keyFor(s2));

  let s3 = Symbol('FOO'); // 每次都生成一个新的Symbol值
  let s4 = Symbol('FOO');
  console.log(s3 === s4, Symbol.keyFor(s3), Symbol.keyFor(s4));
}

// Symbol.iterator => 该对象的默认遍历器方法
// for...of循环时，会调用Symbol.iterator方法
{
  const myIterable = {};
  myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  };
  console.log('Symbol.iterator =>', [...myIterable]);
}
