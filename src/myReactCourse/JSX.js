/**
 * Created by yanghuan on 17/7/15.
 */

import React from 'react';
import { render } from 'react-dom';

// JSX == JavaScript + Xml
// Babel 会把 JSX 编译成一个名为 React.createElement() 函数调用，返回称为 React 元素 // ! 所以react依赖需要import进来
// React.createElement() 会预先执行一些检查，以帮助你编写无错代码
// 作用：用来简化创建虚拟dom

const element = <h1 className="myClassValue">Hello, World !</h1>;

//
//
function formatName(user) {
  return user.firstname + ',' + user.lastname;
}

const user = {
  firstname: 'firstName-y',
  lastname: 'lastName-h',
};

//
// JSX 也是一个表达式
function getGreeting(user) {
  if (user) {
    return <h4> Hello, {formatName(user)}! </h4>; // 在 JSX 中嵌入表达式
  }
  return <h4> Hello, Stranger. </h4>;
}

const element2 = (
  <div>
    {getGreeting(user)}
    {getGreeting()}
  </div>
);

//
//
// JSX属性
// "", 常数属性
// {}, 表达式属性
// ..., 延展属性
//
// class => className, 使用小驼峰定义属性的名称
// for => htmlFor
const element3 = <div tabIndex="0">tabIndex</div>;

const url = `https://www.baidu.com/img/baidu_jgylogo3.gif`;
const element4 = <img src={url} />;

function MyDiv(props) {
  console.log('props =>', JSON.stringify(props, null, 4));
  return (
    <div>
      firstname: {props.firstname}, lastname: {props.lastname}, {props.children}
    </div>
  );
}

const element5 = <MyDiv {...user}>延展属性</MyDiv>; // ! bad 会使代码非常混乱
const element52 = (
  <MyDiv firstname={user.firstname} lastname={user.lastname}>
    延展属性的等价写法
  </MyDiv>
);

// !
// 阮老师解释JSX语法：允许 HTML 与 JavaScript 的混写
// 1.遇到 HTML 标签（以 < 开头），就用 HTML 规则解析
// 2.遇到代码块（以 { 开头），就用 JavaScript 规则解析，允许在{}中嵌入任何表达式
// 3.遇到数组，直接展开数组每一项
//
//
// 自定义组件
// 1.首字母必须大写 // ! 1.

// 2.render 的内容，只能有一个根元素
// 如果返回的 React 元素占用多行，用()包上, 避免自动插入, 括号内部的JSX可拆分为多行 // ! 2.

// 3.组件默认属性: this.props, this.props.children
// 4.单闭合标签 <br />
const names = ['safari', 'chrome'];
const namesDOM = [<h4 key="safari">safari</h4>, <h4 key="chrome">chrome</h4>];

const element6 = (
  <>
    {names}
    {names.map((item) => (
      <h2 key={item}>{item}, engine</h2>
    ))}
    {namesDOM}
  </>
);

export default () => (
  <>
    element, {element}
    element2, {element2}
    <hr />
    <hr />
    element3, {element3}
    element4, {element4}
    <br />
    <br />
    element5, {element5}
    element52, {element52}
    <hr />
    <hr />
    element6, {element6}
  </>
);

//
//
//
// 元素渲染
// React 元素是不可变对象，更新 UI 唯一的方式是创建一个全新的元素
// React 只更新它需要更新的部分（diff 算法）
function tick() {
  const element = (
    <>
      <h2>It is {`${new Date()}`}</h2>
      <h2>{new Date().toLocaleDateString()}</h2>
      <h2>{new Date().toLocaleTimeString()}</h2>
    </>
  );

  render(element, document.getElementById('root'));
}

// setInterval(tick, 1000);
