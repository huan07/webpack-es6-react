import React from 'react';

// 调用 map() 或者 数组的元素是dom 才需要 keys，keys在同辈元素中必须是唯一的，不需要全局唯一。// !
// key的值为字符串，帮助 React 标识哪个项被修改、添加或者移除

// 如果列表项可能被重新排序时，我们不建议使用索引作为 keys，因为这导致一定的性能问题，会很慢

// 键是React的一个内部映射，但其不会传递给组件的内部，// !
// 也就是说组件中需要使用 key 属性的值，请用其他属性名显式传递这个值，另取名myKey={key}，否则组件内部接收不到。// !

function NumberList(props) {
  const numbers = [1, 2, 3, 4, 5];

  const listItems = numbers.map((number) => (
    <li key={String(number)}>{number * 2}</li>
  ));

  return <ul>{listItems}</ul>; // todo 展开数组的每一项
}

export default NumberList;
