import React from 'react';

const ThemeContext = React.createContext('light');

// 孙组件
class ThemedButton2 extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return (
      <div theme={this.context}>
        Button, this.context, {JSON.stringify(this.context)}
      </div>
    );
  }
}

// 子组件
// 使用 context, 我们可以避免通过中间元素传递 props
function Toolbar2() {
  return (
    <div>
      <ThemedButton2 />
    </div>
  );
}

// 父组件
class App2 extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar2 />
      </ThemeContext.Provider>
    );
  }
}

export default App2;
