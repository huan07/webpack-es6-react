import React from 'react';
import Context2 from './Context2';

// 孙组件
class ThemedButton extends React.Component {
  render() {
    return (
      <div theme={this.props.theme}>
        Button, this.props.theme, {JSON.stringify(this.props)}
      </div>
    );
  }
}

// 子组件
function Toolbar(props) {
  // 因为必须将这个值层层传递所有组件。 // todo 避免逐层props传递
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

// 父组件
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

export default () => (
  <>
    <App />
    <Context2 />
  </>
);
