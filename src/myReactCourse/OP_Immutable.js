import React, { Component, PureComponent } from 'react';
import Immutable from 'immutable';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

// 深拷贝的实现会耗费很多内存，
class Test extends PureComponent {
  render() {
    return <div>测试</div>;
  }

  componentDidMount() {
    const myClass1 = Immutable.fromJS({ classmates: { name: 'myClass1' } });

    const myClass_ = myClass1.setIn(['classmates', 'name'], 'myClass1');
    const myClass2 = myClass1.setIn(['classmates', 'name'], 'myClass2');

    console.log(
      myClass1.getIn(['classmates', 'name']),
      myClass_.getIn(['classmates', 'name']),
    );
    console.log(myClass1 === myClass_); // true

    console.log(
      myClass1.getIn(['classmates', 'name']),
      myClass2.getIn(['classmates', 'name']),
    );
    console.log(myClass1 === myClass2); // false
  }
}

//
class OptimisePerformance extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = { count: 1 };
  }

  render() {
    return (
      <button
        onClick={() =>
          this.setState((prevState) => ({ count: prevState.count + 1 }))
        }
      >
        {JSON.stringify(this.props)}
        <br />
        {JSON.stringify(this.state)}
        <br />
        _x to add examples
      </button>
    );
  }
}

export default () => (
  <>
    <Test />
    <OptimisePerformance color="green" />
  </>
);
