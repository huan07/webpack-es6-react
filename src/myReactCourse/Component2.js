import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class GreetingClass extends PureComponent {
  static defaultProps = {
    // 新的静态属性
    job: 'woman or a mother',
  };

  static propTypes = {
    job: PropTypes.string.isRequired,
  };

  render() {
    // this.props, this.state 默认实例属性 // !
    const { job } = this.props;

    return <h2>job is {job}</h2>;
  }
}

export default GreetingClass;
