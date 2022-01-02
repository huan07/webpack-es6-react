// 1.数组的解构赋值
// 模式匹配，按次序
{
  let [, , third] = ['foo', 'bar', 'baz'];
  console.error('third =>', third);

  let [head, , , ...tail] = [1, 2, 3, 4, 5, 6];
  console.log(head, tail);

  // a.嵌套解构
  {
    let [a, [b]] = [1, [2]];
    console.log(a, b);
  }

  // b.解构不成功，变量的值就等于undefined // !
  {
    let [foo, bar] = [1];
    console.log('foo =>', foo);
    console.log('bar =>', bar);
  }

  // c.等号左边的模式，只匹配一部分的等号右边的数组
  {
    let [a, [b], c] = [11, [22, 33], 44];
    console.log(a, b, c);
  }

  // d.等号的右边不是数组（可遍历的数据结构），会报错， // !注意
  // 对象的解构赋值等号的右边不是对象，也会报错 // !注意
  {
    // let [foo] = 1;
  }
  {
    // let [foo] = NaN;
  }
  {
    // let [foo] = false;
  }
  {
    // let [foo] = undefined;
  }
  {
    // let [foo] = null;
  }
  {
    // let [foo] = {};
  }

  // e.可用于Set结构
  {
    let [x, y, z] = new Set(['x', 'y', 'z']);
    console.log(x, y, z);
  }

  // 默认值
  // 等号左边的变量，按照模式，匹配到等号右边的值
  // 等号右边的值 === undefined，等号左边的赋值才生效 // !
  {
    let [x = 11] = [];
    console.warn('x =>', x);

    {
      let [x = 22] = [undefined];
      console.log('x =>', x);
    }
    {
      let [x = 33] = [null];
      console.log('x =>', x);
    }
  }

  // 默认值是一个表达式，惰性求值，只有在用到的时候，才会求值 // ! attention
  {
    function f() {
      console.log('惰性求值 =>', arguments[0]);
      return 'aaa';
    }

    let [x = f(1)] = [1];
    console.log('x = f(1) =>', x);

    let [x2 = f(undefined)] = [];
    console.log('x2 = f(undefined) =>', x2);
  }
}

// 2.对象的解构赋值
// 先找到同名属性，然后再赋给对应的变量
{
  // 等号左边 属性名与变量名同名，省略属性名
  {
    let { foo } = { foo: 'foo' };
    console.log('foo =>', foo);
  }

  // 等号左边 属性名与变量名不同名，
  {
    let { bar: foo } = { bar: 'foo' };
    console.log('foo =>', foo);
  }

  // 可用于嵌套结构的对象，可以设置默认值
  {
    let {
      outter,
      outter: { inner, inner_default = 'inner_default' },
    } = { outter: { inner: 'inner' } };
    console.log('outter =>', outter);
    console.log('inner =>', inner);
    console.log('inner_default =>', inner_default); // ! 默认值
  }

  // 对象的解构赋值可以取到继承的属性 // !! 可取到继承的属性
  {
    const obj = { foo: 'foo' };
    const proto = { protoFoo: 'proto-foo' };
    Object.setPrototypeOf(obj, proto);

    const { protoFoo } = obj;
    console.log('可取到继承的属性 ', obj, protoFoo);
  }
}

// 3.字符串的解构赋值

// 4.数值和布尔值的解构赋值
{
  const { toString, toString: s } = 3;
  console.log('toString =>', toString, s, s === Number.prototype.toString);

  // 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于
  // undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。 // !
  {
    // let { toString: nu } = null;
    // let { toString: un } = undefined;
  }
}

// 5.函数参数的解构赋值
{
}

// 6.圆括号问题 // todo

// 7.用途
{
  let x = 1;
  let y = 2;
  [x, y] = [y, x];

  console.log(x, y);
}
