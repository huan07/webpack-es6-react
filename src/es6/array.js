{
  // 扩展运算符后面还可以放置表达式
  // example
  const isArray = [1, 2];
  const arr = [
    ...(Array.isArray(isArray) ? isArray : []), // ! 同样适用于对象 {}
    0,
    ...[],
  ];
  console.error('arr => ', arr);

  console.log(...[11]);
  // console.log(...null);  //  不是iterator数据结构，会报错 // * error
  // console.log(...undefined);
  console.log(...'null');
  console.log(...'undefined');
}

// ...应用
{
  {
    // 克隆的是指针
    const a1 = [1, 2];
    const a2 = a1;
    a1[0] = 99;
    a1[2] = {
      3: 3,
    };
    console.log('a1, a2 =>', a1, a2);
  }
  {
    // es5克隆全新的数组
    const a1 = [3, 4];
    const a2 = a1.concat(); // !返回全新的数组
    a1[0] = 99;
    a1[2] = {
      3: 3,
    };
    console.log('浅拷贝 =>', a1, a2);
  }
  {
    // es6克隆全新的数组
    const a1 = [5, 6];
    const a2 = [...a1];
    const [...a2_2] = a1;
    console.log('浅拷贝 =>', a1, a2, a2_2); // !!
  }

  {
    // 合并数组
    const a1 = [1, 2];
    const a2 = [3, 4];
    const a = [...a1, ...a2];
    console.log('... 合并数组 =>', a);
  }

  {
    // 与解构赋值结合
    const [first, ...rest] = [1, 2, 3, 4];
    console.log('first =>', first, 'rest =>', rest);
  }
  //
}

// Array.from 转为真正的数组
// 1.类似数组的对象
// 2.部署了 Iterator 接口的数据结构
{
  let arrayLike = {
    0: 'a',
    1: 'b',
    length: 2,
  };

  const toArray = Array.prototype.slice.call(arrayLike);
  // const toArray_2 = [...arrayLike]; // todo error
  const toArray_3 = Array.from(arrayLike);
  console.log(arrayLike, toArray, toArray_3);

  {
    const toArray = (() =>
      Array.from ? Array.from : (obj) => Array.prototype.slice.call(obj))();

    // Array.from 还可以接受第二个函数参数( 类似map功能 )
    // example
    {
      const convertData = Array.from({ length: 3 }, (x) => x || 0);
      const convertData_2 = Array.from({ length: 3 }).map((x) => x || 1);
      console.log(Array.from({ length: 3 }), convertData, convertData_2);
    }

    // Array.from()的另一个应用是，将字符串转为数组 // TODO ??
  }

  // 补充
  // ...
  // Array.from
  // for...of
  // 不忽略空位，将空位处理成 undefined // todo !! attention (而大部分 es5 的方法跳过空位)
  {
    const arrOrigin = [1, , 3];
    const arr = [...arrOrigin]; // todo ?? 依然是空位呢
    const arr2 = Array.from(arrOrigin);
    console.log(arrOrigin, arr, arr2);

    for (let item of arrOrigin) {
      console.log('for...of =>', item);
    }

    for (let item in arrOrigin) {
      console.warn('for...in 忽略空位 =>', item);
    }
  }
}

// 3.Array.of

// 9.数组实例的 flat()，flatMap()
{
  const arrOrigin = [1, [2, [3, 4, 5]]];
  const arr = arrOrigin.flat(); // flat()默认只会“拉平”一层，返回新数组
  console.log(arrOrigin, arr);
  console.log(arrOrigin.flat(2), arrOrigin.flat(Infinity)); // n值为Infinity时维度为无限大
}
