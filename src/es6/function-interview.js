// TODO interview 考题，箭头函数 this 指向问题 变态的题目
{
  (() => {
    console.log('interview 1. =>', this); // window
  })();
}

{
  const arrowFun = () => {
    console.log('interview 2. =>', this); // window, 定义在 window 对象
  };

  arrowFun();
}

{
  const arrowObj = {
    arrFun: function () {
      (() => {
        console.log('interview 3. =>', this); // arrowObj, 沿着作用域链查找到的 // ! 引用外层代码块的 this
      })();
    },
  };

  arrowObj.arrFun();
}

{
  const arrowObj = {
    arrFun: () => {
      console.log('interview 4. =>', this); // window, 定义在 window 对象
    },
  };

  arrowObj.arrFun();
}
