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
  console.log(it, it.next());
  console.log(it.next());
  console.log(it.next());
}

// 2.原生具备 Iterator 接口的数据结构如下。
// Array
// String 是一个类似数组的对象，也原生具备 Iterator 接口

// Set / Map 数据结构

// arguments
// NodeList
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
{
  const generator = function* () {
    yield 1;
    yield* [2, 3]; // yield* 后面跟的是一个可遍历的数据结构，它会调用该结构的遍历器接口
    yield 4;
  };

  const it = generator();
  console.warn('it.next() it =>', it);
  console.log(it.next(), it.next(), it.next(), it.next(), it.next());

  // for...of 遍历 遍历器对象，无需手动调用遍历器对象的 next 方法 // !
  const it_2 = generator();
  for (let i of it_2) {
    console.log(i);
  }

  console.log('[...generator()] =>', [...generator()]);
}

// 6. 遍历器对象的 return()，throw() // TODO ...

// 7. for...of
// 可以代替 forEach
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
    console.log('let key in arr =>', key);
  }

  for (let item of arr.keys()) {
    console.log('let item of arr.keys() =>', item); //区别二：for...of 循环只遍历 数字键名 // !
  }

  for (let item of arr) {
    console.log('item =>', item);
  }
}

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
      break; // ! 可以中途跳出循环
    }
    result.push(i);
  }

  console.log(result);
}
