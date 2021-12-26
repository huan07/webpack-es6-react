import React from 'react';
import PropTypes from 'prop-types';

const Greeting = (props) => {
  // props = {} 默认参数及值 // !
  const { name, age } = props;

  function fun() {
    console.log('function');
  }

  const funArrow = () => {
    console.log('function arrow');
  };

  fun();
  funArrow();

  return (
    <div>
      <h2> {`name is ${name}`}</h2>
      <h3> {`age is ${age}`}</h3>
    </div>
  );
};

Greeting.defaultProps = {
  // 老的静态属性
  name: 'ycg',
  age: 29,
};

Greeting.propTypes = {
  /* 也会对默认属性 defaultProps 进行类型检测。只会在开发环境检测 */
  name: PropTypes.string,
  age: PropTypes.number,
};

export default Greeting;
