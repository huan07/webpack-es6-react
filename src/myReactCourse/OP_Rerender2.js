import React, { Component, PureComponent } from 'react';

// 优化方式 // todo fixd
// 3.使用 shouldComponentUpdate 生命周期方法

// 在 shouldComponentUpdate 生命周期方法中放置一个自定义逻辑，以决定是否调用组件的 render 函数。
class Demo extends PureComponent {
  state = {
    count: 1,
    count2: 2,
    countX: 'X',
  };

  handleClick = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  handleClick2 = () => {
    this.setState({
      count2: this.state.count2 + 2,
    });
  };

  handleClickX = () => {
    this.setState({
      countX: this.state.countX + 'X',
    });
  };

  render() {
    const { count, count2 } = this.state;

    console.log('render Demo =>', JSON.stringify(this.state));

    return (
      <div>
        <h1 onClick={this.handleClick}>点我测试 count => {count}</h1>
        <h3 onClick={this.handleClick2}>点我测试 count2 => {count2}</h3>
        <p onClick={this.handleClickX}>
          点我测试 countX => {} ，还是会 render, 即使没有用到 countX
        </p>
      </div>
    );
  }
}

class OP_Demo extends Component {
  // todo 1.继承 Component
  state = {
    count: 1,
    count2: 2,
    countX: 'X',
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // todo 2.自定义 shouldComponentUpdate
    if (
      this.state.count !== nextState.count ||
      this.state.count2 !== nextState.count2
    ) {
      return true;
    }
    return false; // todo !! countX 也是 state 的数据，但是它不影响 render()，将其排除在外
  }

  handleClick = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  handleClick2 = () => {
    this.setState({
      count2: this.state.count2 + 2,
    });
  };

  handleClickX = () => {
    this.setState({
      countX: this.state.countX + 'X_OP',
    });
  };

  render() {
    const { count, count2 } = this.state;

    console.log('render OP_Demo =>', JSON.stringify(this.state));

    return (
      <div>
        <h1 onClick={this.handleClick}>点我测试 count => {count}</h1>
        <h3 onClick={this.handleClick2}>点我测试 count2 => {count2}</h3>
        <p onClick={this.handleClickX}>
          点我测试 countX => {} ，不会 render, 因为自定义了
          shouldComponentDidUpdate 逻辑
        </p>
      </div>
    );
  }
}

export default () => (
  <>
    <Demo />
    <br />
    <hr />
    <br />
    <OP_Demo />
  </>
);
