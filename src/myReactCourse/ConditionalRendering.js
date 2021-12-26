import React, { PureComponent } from 'react';

// 1.if or 条件操作符
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const { isLoggedIn } = props;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

// 2.元素变量
function LoginButton(props) {
  // ! propsFun 子组件调用父组件的方法
  return <button onClick={props.onClick}>登陆</button>;
}

function LogoutButton(props) {
  return <button onClick={props.onClick}>离开</button>;
}

class LoginControl extends PureComponent {
  state = {
    isLoggedIn: true,
  };

  handleLogoutClick = () => {
    this.setState({ isLoggedIn: false });
  };

  handleLoginClick = () => {
    this.setState({ isLoggedIn: true });
  };

  render() {
    const { isLoggedIn } = this.state;
    let button = null; // ! 变量来储存元素

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />; // 状态提升
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <>
        <Greeting isLoggedIn={isLoggedIn}></Greeting>
        {button}
        状态提升思路
      </>
    );
  }
}

export default () => (
  <>
    <Greeting isLoggedIn={true} />
    <Greeting />

    <hr />

    <LoginControl />
  </>
);
