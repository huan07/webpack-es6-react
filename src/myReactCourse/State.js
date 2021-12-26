import React, { PureComponent } from 'react';

// 把多个 setState() 调用合并成一个调用
// setState() 传入对象和传入函数的区别
class Demo extends PureComponent {
  // todo 第二个回调函数的使用场景，可以先不用看
  state = {
    decre: -1,
    incre: 1,
  };

  decre() {
    const { decre } = this.state;
    this.setState(
      {
        decre: decre - 1,
      },
      () => {
        // console.log('3. render之后执行 =>', this.state.decre);
      },
    );
    console.log('1. decre =>', this.state.decre);
  }

  incre() {
    this.setState(
      ({ incre }) => {
        // 拿到本次状态，更新下次状态 // ! good 推荐使用
        console.log('2. incre+1 =>', incre + 1);
        return {
          incre: incre + 1,
        };
      },
      () => {
        // console.log('4. render之后执行 =>', this.state.incre);
      },
    );
    console.log('1. incre =>', this.state.incre);
  }

  handleDecreClick = () => {
    // 执行多次，只更新一次
    this.decre();
    this.decre();
  };

  handleClick = () => {
    // 执行多次，更新多次
    this.incre();
    this.incre();
  };

  render() {
    console.log('render this.state =>', JSON.stringify(this.state, null, 4));

    return (
      <>
        <p>setState传入对象和传入函数的区别</p>

        <p onClick={this.handleDecreClick}>
          传入对象 = 点击1次，调用2次， 只更新1次值， render1次，
          {this.state.decre}
        </p>

        <p onClick={this.handleClick}>
          传入函数 = 点击1次，调用2次，
          <span style={{ color: 'red' }}>更新2次值，</span>
          render1次，{this.state.incre}
        </p>
      </>
    );
  }
}

export default Demo;
