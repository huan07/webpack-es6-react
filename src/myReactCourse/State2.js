import React, { PureComponent } from 'react';

// setState 发生了什么
class Demo extends PureComponent {
  state = {
    static: '0',
    incre: 0,
  };

  handleStaticClick = () => {
    this.setState({
      static: 'true',
    });
  };

  handleClick = () => {
    this.setState(({ incre }) => ({
      incre: incre + 1,
    }));
  };

  render() {
    console.log('render this.state =>', JSON.stringify(this.state, null, 4));

    return (
      <>
        <p onClick={this.handleStaticClick}>
          点我，没有变化，不会去render ！！！！
          {this.state.static}
        </p>

        <p onClick={this.handleClick}>
          点我，
          <span style={{ color: 'red' }}>有变化，才会去render ！！！！</span>
          {this.state.incre}
        </p>
      </>
    );
  }
}

export default Demo;
