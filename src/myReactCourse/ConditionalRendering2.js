import React, { PureComponent } from 'react';

// 3.（内联条件渲染方式）包裹在{}中，更简短的语法实现条件渲染 // !
// a. && 且运算符
// b. ?: 三元运算符
function Mailbox(props) {
  const { unreadMessages } = props;
  return (
    <>
      {unreadMessages.length > 0 && (
        <h2>you have {unreadMessages.length} unread messages.</h2>
      )}
      {unreadMessages.length > 0 ? (
        <h3>you have {unreadMessages.length} unread messages.</h3>
      ) : null}

      {unreadMessages.length < 0 && (
        <h4>you have {unreadMessages.length} unread messages.</h4>
      )}

      {0 && <div>渲染数字：{0}</div>}
    </>
  );
}

// 4.阻止组件渲染（ render 方法中返回 null，并不会影响组件的生命周期 ）
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }
  return <div className="warning">Warning!</div>;
}

class Page extends PureComponent {
  state = { showWarning: true };

  handleToggleClick = () => {
    this.setState((prevState) => ({
      showWarning: !prevState.showWarning,
    }));
  };

  render() {
    const { showWarning } = this.state;
    return (
      <div>
        <WarningBanner warn={showWarning} />
        <button onClick={this.handleToggleClick}>
          {showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

export default () => (
  <>
    <Mailbox unreadMessages={['baidu', 'baidu2', 'baidu3']} />
    <hr />
    <Page />
  </>
);
