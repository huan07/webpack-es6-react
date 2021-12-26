import React, { Component, PureComponent } from 'react';

class PComponent extends PureComponent {
  // ! 接收到的props是对象，
  // shouldComponentUpdate方法执行的是浅比较

  render() {
    const { name, age } = this.props.person;
    return (
      <>
        <p>NAME: {name}</p>
        <p>AGE: {age}</p>
      </>
    );
  }
}

class Demo extends Component {
  state = {
    person: {
      name: 'vk',
      age: 1,
    },
  };

  doChange = () => {
    const { person } = this.state;
    // 这种情况下，person的引用地址没有变化，diff前后浅比较相等，所以并没有引起PComponent变化
    // 如果PComponent是继承自React.Component,因为父组件的render导致了子组件也render了，是会产生变化的
    // person.name = 'vk2';
    // this.setState({ person })
    // 正确的写法
    // ! 生成一个新的对象，作为props传递给子组件
    this.setState({
      person: {
        ...person,
        name: 'vk2',
      },
    });
  };

  render() {
    console.log(this.state);

    const { person } = this.state;
    return (
      <>
        <button onClick={this.doChange}>Change</button>
        <PComponent person={person} />
      </>
    );
  }
}

export default Demo;
