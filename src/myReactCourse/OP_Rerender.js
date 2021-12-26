import React, { PureComponent } from 'react';

function Child(props) {
  console.log('render Child =>', props);

  return <div>Child props =${JSON.stringify(props)}</div>;
}

// 父组件 render 一次，它的子组件也会 render 一次，不管子组件的 props 是否来源于父组件的 state // todo bad !!
class Parent extends PureComponent {
  state = { count: 0 };

  handleClick = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    const { count } = this.state;
    console.log('render Parent =>', this.state);

    return (
      <div onClick={this.handleClick}>
        Parent this.state => {JSON.stringify(count)}
        {/* Child组件 不接收父组件的数据 */}
        <Child />
        {/* Child组件 接收常数 */}
        <Child count={'myCount'} />
        {/* Child组件 接收父组件的state */}
        <Child count={count} />
      </div>
    );
  }
}

// 优化方式 // todo fixd
// 1.class 组件继承纯组件 PureComponent
// 2.使用 React.memo 进行组件记忆，React.memo 包裹函数组件
class OP_Child extends PureComponent {
  render() {
    console.log('render Child 浅比较后渲染 =>', this.props);

    return <div>Child props = ${JSON.stringify(this.props)}</div>;
  }
}

const OP_Child_2 = React.memo(function (props) {
  console.log('render Child React.memo =>', props);

  return <div>Child props = ${JSON.stringify(props)}</div>;
});

class OP_Parent extends PureComponent {
  state = { count: 0 };

  handleClick = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    const { count } = this.state;
    console.log('render OP_Parent =>', this.state);

    return (
      <div onClick={this.handleClick}>
        Parent this.state => {JSON.stringify(count)}
        <OP_Child />
        <OP_Child count={'myCount'} />
        <OP_Child count={count} />
        <hr />
        <OP_Child_2 />
        <OP_Child_2 count={'myCount'} />
        <OP_Child_2 count={count} />
      </div>
    );
  }
}

export default () => (
  <>
    <Parent />
    <hr />
    <hr />
    <OP_Parent />
  </>
);
