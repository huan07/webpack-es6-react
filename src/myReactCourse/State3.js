import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom'; // ! 在严格模式下已被废弃且不推荐使用

class Demo extends PureComponent {
  SYNC_COUNT = 15;

  state = {
    count11: 11,
    count12: 12,

    count11_2: 11,
    count12_2: 12,

    //
    //
    syncCount11: 11,
    syncCount12: 12,
  };

  handleClick = () => {
    // setState 异步
    this.setState({ count11: this.state.count11 + 1 });
    this.setState({ count11: this.state.count11 + 1 });
  };

  handleClick2 = () => {
    // setState 异步
    this.setState((prevState) => ({
      count12: prevState.count12 + 1,
    }));
    this.setState((prevState) => ({
      count12: prevState.count12 + 1,
    }));
  };

  componentDidMount() {
    // setState 异步
    this.setState({ count11_2: this.state.count11_2 + 1 });
    this.setState({ count11_2: this.state.count11_2 + 1 });

    this.setState((prevState) => ({
      count12_2: prevState.count12_2 + 1,
    }));
    this.setState((prevState) => ({
      count12_2: prevState.count12_2 + 1,
    }));
    //
    //
    //
    // 原生事件处理程序 setState 同步
    this.$demo = findDOMNode(this);
    console.log('this.$demo => ', this.$demo);

    this.$box = this.$demo.querySelector('#box');
    this.$box.addEventListener(
      'click',
      () => {
        this.setState({ syncCount11: this.state.syncCount11 + 1 }); // todo setState 同步
        this.setState({ syncCount11: this.state.syncCount11 + 1 });
      },
      false,
    );

    this.intervalId = setInterval(() => {
      const { syncCount12 } = this.state;
      if (syncCount12 === this.SYNC_COUNT) {
        clearInterval(this.intervalId);
        return;
      }
      this.setState({ syncCount12: syncCount12 + 1 }); // todo setState 同步
      this.setState({ syncCount12: syncCount12 + 1 });
    }, 200);
  }

  render() {
    console.log(JSON.stringify(this.state, null, 4));

    const { count11, count12, count11_2, count12_2, syncCount11, syncCount12 } =
      this.state;
    return (
      <div>
        <div>异步 setState 场景，</div>
        <div onClick={this.handleClick}>
          1.传入对象，
          <span style={{ color: 'red' }}>无法依赖他的值来更新下一个状态，</span>
          count11: {count11}
        </div>
        <div onClick={this.handleClick2}>
          2.传入函数，生效，count12: {count12}
        </div>
        <br />
        <div>count11_2: {count11_2},</div>
        <div>count12_2: {count12_2},</div>
        <br />
        <br />
        <hr />
        <hr />
        <br />
        <br />
        <div>同步 setState 场景，</div>
        <div id="box">1.syncCount11: {syncCount11}</div>
        <div>2.syncCount12: {syncCount12}</div>
      </div>
    );
  }
}

export default Demo;
