/**
 * Created by yangHuan on 17/9/12.
 */

// ! Set 数据结构，不重复的值的集合（它类似于数组，但是成员的值都是唯一的）
// Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数
{
  const s = new Set();
  console.log(s);
}
{
  const s = new Set([1, 2, 3, 4, 4, 3, 2, 1, '1']);
  console.log(s);
}

// Set 内部判断两个值是否不同，类似于精确相等运算符（ === ），主要的区别是 NaN 等于自身
// NaN 等于自身，两个对象总是不想等的
{
  const set = new Set();
  const a = NaN;
  const b = NaN;
  set.add(a);
  set.add(b);
  console.warn('1.两个 NaN 是相等的 ＝>', set.size); // !
}
{
  const set = new Set();
  set.add({});
  set.add({});
  console.warn('2.两个对象 {} 总是不相等的 =>', set.size);
}

// Set 实例的方法: add, delete, has, clear
{
  const set = new Set();
  set.add(1).add(2).add(2).add(3);
  console.log('add example =>', set.size, set);

  set.delete(1);
  console.log('delete example =>', set.has(1), set.has(2));

  set.clear();
  console.log('clear example =>', set.size);
}

// ! 用途
// 去除数组重复成员：数组作为参数转为 Set 数据结构，Set 再被转换为数组
// 扩展运算符[...xx], Array.from(xx)
{
  const array = [1, 2, '2', 2, 3];

  const xx = [...new Set(array)];

  function dedupe(arr) {
    return Array.from(new Set(arr));
  }

  const xx2 = dedupe(array);

  console.log('去除数组重复成员 方式之一 =>', xx);
  console.log('去除数组重复成员 方式之二 =>', xx2);
}

// 去除字符串里面的重复字符
{
  const a = [...new Set('abaabc')];
  console.log(a, a.join(','), a.join(''));
}

// Set 实例的方法: keys(), values(), entries(), 返回的都是遍历器对象
// forEach()
{
  const set = new Set(['red', 'green', 'blue']);

  for (let item of set.keys()) {
    console.log('set.keys() =>', item);
  }

  {
    for (let item of set.values()) {
      console.log('set.values() =>', item);
    }

    console.warn(Set.prototype[Symbol.iterator] === Set.prototype.values); // !
    for (let item of set) {
      console.log('set =>', item); // ! Set 数据结构 默认遍历器生成函数就是它的values方法
    }
  }

  {
    for (let item of set.entries()) {
      console.log('set.entries() =>', item);
    }

    set.forEach((value, key, self) => {
      console.log(`value => ${value}, key => ${key}`);
    });
  }
}

// ! 遍历的应用
// 1.扩展运算符（...）内部使用 for...of 循环，所以也可以用于 Set 结构
// 2.扩展运算符和 Set 结构相结合，就可以去除数组的重复成员
// 3.map filter 间接用于 Set
{
  let set = new Set([1, 2, 3]);
  set = new Set([...set].map((x) => x + 1000));
  console.warn('map => ', set);

  {
    let set = new Set([2, 4, 9, 11]);
    set = new Set([...set].filter((x) => x % 2 === 1));
    console.log('filter => ', set);

    // 数组并集/交集/差集
    {
      console.log('Set => union intersect difference');
      const arr1 = [1, 2, 3];
      const arr2 = [2, 3, 4];
      const set1 = new Set(arr1);
      const set2 = new Set(arr2);

      const union = [...new Set([...arr1, ...arr2])]; // 数组并集
      const intersect = arr1.filter((item) => set2.has(item)); //   数组交集
      const difference = arr1.filter((item) => !set2.has(item)); // 数组差集

      console.error(union, intersect, difference);
    }
  }
}

// WeakSet
// a.WeakSet 的成员只能是对象
// b.WeakSet 中的对象都是弱引用（因为它会随时消失，WeakSet 不可遍历）
{
  const ws = new WeakSet();
  // ws.add(1); error
  // ws.add(Symbol()); error

  const a = [
    [1, 2],
    [3, 4],
  ];
  const ws2 = new WeakSet(a);
  console.warn('ws, ws2 =>', ws, ws2);

  {
    // example // ! 使用场景
    const foos = new WeakSet();

    class Foo {
      constructor() {
        foos.add(this);
      }

      method() {
        if (!foos.has(this)) {
          throw new TypeError('Foo.prototype.method 只能在 Foo 的实例上调用');
        }
        return true;
      }
    }

    console.log('test WeakSet =>', new Foo().method()); // to which  why why
    // console.log(Foo.method());
  }

  // 弱引用
  // 对象成员在外部消失，设置为 null , 它在 WeakSet 里面的引用就会自动消失 // !
  {
    // example
    {
      let set = new Set();
      let obj = { 1: 1 };
      set.add(obj);

      console.warn('Set =>', set); // obj 的值依然是 set 的成员

      obj = null;
      console.log('Set =>', set); // obj 的值依然是 set 的成员

      {
        let ws = new WeakSet();
        let obj = { 1: 1 };
        ws.add(obj);

        console.log('WeakSet => ', ws); // obj = null; obj 的值不再是 weakSet 的成员 // todo !!

        obj = null;
        console.log('WeakSet => ', ws); // obj = null; obj 的值不再是 weakSet 的成员
      }
    }

    //
    {
      const m = new Map();
      let o = [1, 2];
      m.set(o, 'array');

      console.warn('Map =>', m);

      o = null;
      console.log('Map =>', m);

      {
        const wm = new WeakMap();
        let o = [1, 2];
        wm.set(o, 'array');

        console.log('WeakMap =>', wm);

        o = null;
        console.log('WeakMap =>', wm);
      }
    }
  }
}
