// Object.is 严格相等，
// 与es5 === 行为基本一致，不同之处只有2个
{
  console.log(Object.is(NaN, NaN), Object.is(+0, -0)); // true / false
  console.log(NaN === NaN, +0 === -0);

  // todo 部署Object.is
}

// Object.assign()方法
// 用于对象的合并
{
  const target = { a: 1 };
  const source = { b: 2 };
  const source2 = { c: 3 };

  const result = Object.assign(target, source, source2); // 返回值是 target
  console.warn('target =>', target, result, target === result);

  // 首参数
  // 只有一个参数，返回该参数
  // 如果参数不是对象，先转成对象，再返回对象
  // undefined / null 无法转成对象 // ! error
  console.error(
    '首参数 =>',
    Object.assign({ true: 1 }),
    Object.assign(true), // 转成包装对象
    Object.assign(1), // 转成包装对象
    Object.assign('hello'), // 转成包装对象
  );
  /*
        console.log(
            Object.assign(undefined),
            Object.assign(null)
        );
        */
  console.log(
    '非首参数 =>',
    Object.assign({}, { true: 1 }),
    Object.assign({}, true),
    Object.assign({}, 1),
    Object.assign({}, 'hello'),
    Object.assign({}, undefined),
    Object.assign({}, null),
  );
}
