import React, { PureComponent } from 'react';

// 组件挂载阶段
// getDerivedStateFromProps静态方法返回null与对象的区别
class Lifecycle extends PureComponent {
  constructor(props) {
    console.log('1.constructor() =>');

    super(props);
    this.state = { count: 1 };
  }

  static getDerivedStateFromProps() {
    console.log('2.getDerivedStateFromProps() =>');

    return null;
  }

  render() {
    console.log('3.render() =>', this.state);

    return <>测试 挂载阶段 this.state.count = {this.state.count}</>;
  }

  componentDidMount() {
    console.log('4.componentDidMount() =>');
  }
}

class Lifecycle2 extends PureComponent {
  constructor(props) {
    console.log('---- 21.constructor() =>');

    super(props);
    this.state = { count: 11 };
  }

  static getDerivedStateFromProps() {
    console.log('---- 22.getDerivedStateFromProps() =>');

    return null;
    // return { count: 33 };
  }

  render() {
    // todo 2. "协调"过程来决定是否重新渲染组件
    console.log('---- 23.render() =>', this.state);

    return <>测试 挂载阶段 this.state.count = {this.state.count}</>;
  }

  componentDidMount() {
    console.log('---- 24.componentDidMount() =>');

    this.setState({
      // todo 1.setState() 之后触发 组件生命周期内的 组件更新阶段 执行
      count: 22,
    });
  }
}

export default () => (
  <>
    <Lifecycle />
    <br />
    <br />
    <hr />
    <Lifecycle2 />
  </>
);
