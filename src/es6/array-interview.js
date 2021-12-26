// ! 优先用代码量少的方法

// 嵌套的数组扁平化 // !
{
  function flatArray(arr) {
    return arr.reduce((result, curr) => {
      if (Array.isArray(curr)) {
        return result.concat(flatArray(curr));
      }
      return result.concat(curr);
    }, []);
  }

  function* flatArray2(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
      const item = arr[i];
      if (Array.isArray(item)) {
        yield* flatArray2(item);
      } else {
        yield item;
      }
    }
  }

  function* flatArray3(arr) {
    if (Array.isArray(arr)) {
      for (let item of arr) {
        yield* flatArray3(item); // ? ? ?
      }
    } else {
      yield arr;
    }
  }

  // test
  const arr = [1, [2, 3, [4, 5, 6]]];

  const result = arr.flat(Infinity);
  const result2 = flatArray(arr);
  const result3 = [...flatArray2(arr)];

  console.error('flatArray =>', result, result2, result3, [...flatArray3(arr)]);
}

// 数组去重
{
  function uniqueArray(arr) {
    return arr.reduce((result, curr) => {
      // !或者用for ... of遍历
      // todo 好不好，性能问题，可用吗？
      if (!result.includes(curr)) {
        result.push(curr);
      }
      return result;
    }, []);
  }

  // test
  const arr = [1, '1', '1', 2, '2', 3];

  const result = [...new Set(arr)];
  const result2 = Array.from(new Set(arr));
  const result3 = uniqueArray(arr);

  console.log('uniqueArray =>', result, result2, result3);

  // more
  // for循环 + indexOf
  // for循环 + includes
}

// 数组元素的最大值
{
  function maxItem(arr) {
    return arr.reduce((result, curr) => {
      return result >= curr ? result : curr;
    }, arr[0]);
  }

  // test
  const numArr = [1, 11, 101];
  const arr2 = ['1', '11', '101'];

  const result = Math.max(...numArr);
  const result_2 = Math.max.apply(null, numArr);
  const result_3 = maxItem(numArr);

  const result2 = Math.max(...arr2); // 数组元素会转为数值，再比较
  const result2_2 = Math.max.apply(null, arr2); // 数组元素会转为数值，再比较
  const result2_3 = maxItem(arr2); // ! 对字符串的比较，返回值是'11'

  console.log('maxItem: numArr =>', result, result_2, result_3);
  console.log('maxItem: arr =>', result2, result2_2, result2_3);
}

// 数组合并
{
  const arr = [1, 2, 3];
  const arr2 = ['1', '2', '3'];

  const result = [...arr, ...arr2];
  const result2 = arr.concat(arr2);
  Array.prototype.push.apply(arr, arr2);

  console.log('合并数组 =>', result, result2, arr);
}

// 数组是否包含某值
{
  const value = 1;
  const arr = [1, 2, 3];

  const result = arr.includes(value);
  const result2 = arr.indexOf(value) >= 0;
  const result3 = arr.find((item) => item === value) !== undefined;
  const result4 = arr.findIndex((item) => item === value) >= 0;
  const result5 = arr.some((item) => item === value);

  console.log(
    '数组是否包含某值 =>',
    result,
    result2,
    result3,
    result4,
    result5,
  );
}

// 转为真正的数组
{
  function foo() {
    const result = [...arguments];
    const result2 = Array.from(arguments);
    const result3 = Array.prototype.slice.call(arguments);
    const result4 = Array.prototype.slice.apply(arguments);

    console.log('转换为真正的数组 =>', arguments);
    console.log(result, result2, result3, result4);
  }

  foo(1, 2, 3);
}
