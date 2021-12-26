import React, { Component, PureComponent } from 'react';

// 组件更新阶段
class Lifecycle extends Component {
  state = {
    count: 2,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('1.getDerivedStateFromProps =>');

    return null;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('2.shouldComponentUpdate =>');

    return true;
  }

  handleChange = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    console.log('3.render =>');

    return (
      <div onClick={this.handleChange}>
        测试 更新阶段 this.state.count = {this.state.count}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('5.componentDidUpdate =>', snapshot);
  }
}

class Lifecycle2 extends PureComponent {
  state = {
    count: 22,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('---- 21.getDerivedStateFromProps =>');

    return null;
  }

  /*
  // todo PureComponent内部已经写好了
  shouldComponentUpdate(nextProps, nextState, nextContext) { 
        console.log('---- 22.shouldComponentUpdate =>');

        return true;
    }*/

  handleChange = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    console.log('---- 23.render =>');

    return (
      <div onClick={this.handleChange}>
        测试 更新阶段 this.state.count = {this.state.count}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('---- 25.componentDidUpdate =>', prevProps, prevState);

    if (prevState.count === 25) {
      this.setState((prevState) => ({
        count: prevState.count + 1,
      }));
    }

    // ! 处于性能考虑，需要加上判断条件，否则一直 render()，导致死循环
    if (this.props.x !== prevProps.x) {
      this.setState({});
    }
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
