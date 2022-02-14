// 用途
{
  for (let i = 0; i < 4; i++) {}
  // console.log('i =>', i); // error 未声明的变量
}

{
  var a = [];
  for (var j = 0; j < 3; j++) {
    a[j] = function () {
      console.log(j);
    };
  }
  a[2]();

  // 1.fixed by let
  {
    let b = [];
    for (let i = 0; i < 3; i++) {
      b[i] = function () {
        console.log('fixed by let variable =>', i);
      };
    }
    b[0]();
    b[1]();
    b[2]();
  }

  // 2.fixed by IIFE
  var c = [];
  for (var index = 0; index < 3; index++) {
    c[index] = (function (j) {
      return function () {
        return j;
      };
    })(index);
  }
  console.log(c[0](), c[1](), c[2]());
}

// for循环还有一个特别之处，// !
// 设置循环变量的那部分是一个 父作用域，而循环体内部是一个单独的 子作用域。
{
  for (let i = 0; i < 3; i++) {
    let i = 'abc';
    console.log('i =>', i);
  }
}

// 暂时性死区
// 区块中存在let和const命令，这个区块对这些命令声明的变量，就形成了封闭作用域。
// 在声明之前就使用这些变量，就会报错。
{
  var tmp = 123;

  if (true) {
    tmp = 'abc'; // ? 并没有ReferenceError
    let tmp;
  }
}

// es6允许块级作用域的任意嵌套
{
  {
    {
      let nested = 'nestedInner';
      console.log('nested =>', nested);
    }
    let nested = 'nestedOutter';
    console.log('nested =>', nested);
  }
}
