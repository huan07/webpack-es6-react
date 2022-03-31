import React, { PureComponent } from 'react';
import { render } from 'react-dom';

// 1. props
function Clock(props) {
  return (
    <div>
      <h1>Hello, world1</h1>
      <h2>It is{props.date.toLocaleTimeString()}</h2>
    </div>
  );
}

function tick() {
  render(<Clock date={new Date()} />, document.getElementById('root'));
}

// setInterval(tick, 1000);

// 2. props => state
// 只编写一次代码，便可以让 Clock 组件自我更新
class Clock2 extends PureComponent {
  state = { date: new Date() }; // ! 1.构造函数是唯一可以给 this.state 赋值的地方

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    // 在组件被销毁时释放所占用的资源 // ! good
    this.timerID && clearInterval(this.timerID); // !, 虽然直接写 clearInterval(this.timerID) 不会报错
  }

  tick = () => {
    this.setState({
      date: new Date(), // ! 2.修改 state 应该使用 setState()
    });
  };

  render() {
    return (
      <div>
        <h1>Hello, world1</h1>
        <h2>It is{this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

export default Clock2;
