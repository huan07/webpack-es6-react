import React, { PureComponent } from 'react';

function ActionLink() {
  function handleClick(evt) {
    console.log(evt);
    evt.preventDefault();
    // 阻止默认行为，必须明确调用 preventDefault
    // evt 是一个合成的事件
    alert('This link was clicked');
  }

  return (
    <a href="http://www.baidu.com" onClick={handleClick}>
      Click me but will be prevented use e.preventDefault()
    </a>
  );
}

class Toggle extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = { isToggleOn: true };

    // 为了在回调中使用 `this`，这个绑定是必不可少的 // ! fixed 1

    // 从右往左赋值，右侧是原型方法，左侧是实例方法 // !
    // this.handleClick = ::this.handleClick;
    this.handleClick = this.handleClick.bind(this);
  }

  changed() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  handleClick() {
    // ! fixed 1 需要在构造函数内 bind，将函数绑定到当前上下文
    // 不绑定的话，this 指向 undefined
    this.changed();
  }

  handleClick2 = () => {
    // ! fixed 2 better
    // 被解析到 constructor 函数内部，作为实例方法 // !
    this.changed();
  };

  handleClick3(named, evt) {
    // ! fixed 3 bad
    // evt 可以隐式传递
    // 每次渲染组件时都会创建不同的回调函数，
    // 如果该回调函数作为 props 传入子组件时，子组件可能会进行额外的重新渲染。性能较差
    console.log(named, evt, evt.target);
    this.changed();
  }

  render() {
    const { isToggleOn } = this.state;
    return (
      <>
        <button onClick={this.handleClick}>
          {isToggleOn ? 'ON' : 'OFF'}
          {' ::不支持 to fix'}
        </button>
        <br />
        <br />

        <button onClick={this.handleClick2}>
          {isToggleOn ? 'ON' : 'OFF '} {'handleClick2 better'}
        </button>
        <br />
        <br />

        <button
          onClick={(evt) => {
            // 箭头函数的this 指向Toggle
            this.handleClick3('传参数', evt);
          }}
        >
          {isToggleOn ? 'ON' : 'OFF'} {'handleClick3 bad'}
        </button>
        <br />
        <br />
        <button onClick={this.handleClick3.bind(this, '传参数')}>
          {isToggleOn ? 'ON' : 'OFF'} {'handleClick3 bad e被隐式传递'}
        </button>
      </>
    );
  }
}

export default () => (
  <>
    <ActionLink />
    <br />
    <br />
    <Toggle />
  </>
);
