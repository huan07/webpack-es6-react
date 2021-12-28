// 1.
{
  function makeIterator(array) {
    var nextIndex = 0;
    return {
      next: function () {
        // closure
        return nextIndex < array.length
          ? { value: array[nextIndex++], done: false }
          : { value: undefined, done: true };
      },
    };
  }

  var it = makeIterator(['a', 'b']);
  console.log(it);
  console.log(it.next());
  console.log(it.next());
  console.log(it.next());
}

// 2.原生具备 Iterator 接口的数据结构如下。
// Array
// String 是一个类似数组的对象，也原生具备 Iterator 接口

// Set / Map 数据结构

// 函数的 arguments 对象
// NodeList 对象
{
  let arr = ['a', 'b'];
  let iter = arr[Symbol.iterator]();

  console.warn('2. =>', iter);
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());

  var someString = 'hi';
  console.log(
    new String(someString),
    [...someString],
    typeof someString[Symbol.iterator],
  );
}

// 3.调用 Iterator 接口的场合
// (1)解构赋值 Array/Set
{
  let set = new Set().add('a').add('b').add('c');

  let [x, y] = set;
  let [first, ...rest] = set;

  console.warn('3.1 => ', x, y, first, rest);
}

// (2)扩展运算符 ...
// 只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组
{
}

// (3)yield*
// 参照底部

// 6. 遍历器对象的 return()，throw() // todo ...

// 7. for...of
// 可以代替forEach方法
{
  const arr = ['red', 'green', 'blue'];

  for (let v of arr) {
    console.warn('7.v arr =>', v);
  }

  arr.forEach(function (item, index) {
    console.log('item, index =>', item, index);
  });
}

// 区别二：针对数组
{
  const arr = ['a', 'b', 'c'];
  arr.foo = 'hello';

  for (let key in arr) {
    // 区别二：for...in 循环不仅遍历 数字键名 ，还会遍历手动添加的 其他键名 ，甚至包括 原型链上的键名
    console.error('let key in arr =>', key);
  }

  for (let item of arr.keys()) {
    console.log('let item of arr.keys() =>', item); // 区别二：for...of 循环只遍历 数字键名 // !
  }
}

//
// for...of 与其他遍历语法的比较
// for 循环, 比较麻烦。
// forEach 方法, 无法中途跳出 forEach 循环，不能与 break、continue 和 return 配合使用。 // !
//
//
// for...of 有着同 for...in 一样的简洁语法，但是没有 for...in 那些缺点（遍历数组键名）。
// for...of 可以中途跳出 forEach 循环，与 break、continue 和 return 配合使用。// !
{
  // example
  function* fibonacci() {
    let [prev, curr] = [0, 1];
    for (;;) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  const result = [];
  const fibonacciGen = fibonacci();
  for (let i of fibonacciGen) {
    if (i >= 6) {
      break; // 可以中途跳出循环
    }
    result.push(i);
  }

  console.log(result);
}

{
  const generator = function* () {
    yield 1;
    yield* [2, 3]; // yield* 后面跟的是一个 可遍历的数据结构 ，它会调用该结构的遍历器接口
    yield 4;
  };

  const it = generator();
  console.log(it.next(), it.next(), it.next(), it.next(), it.next()); // ! 第1种遍历方式

  // for...of 遍历 遍历器对象，无需手动调用遍历器对象的 next 方法
  // ! 第2种遍历方式
  for (let i of generator()) {
    console.log(i);
  }

  console.log('[...generator()] =>', [...generator()]); // ! 第3种遍历方式
}
