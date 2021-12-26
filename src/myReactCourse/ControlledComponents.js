import React, { PureComponent } from 'react';

// 1.使得 <input type="text">, <textarea> 和 <select> 之类的标签都非常相似
// 它们都接受一个 value 属性，你可以使用它来实现受控组件
class NameForm extends PureComponent {
  state = { value: 'grapefruit' };

  handleChange = (evt) => {
    // ! 默认传参数
    this.setState({ value: evt.target.value });
  };

  handleSumbit = (evt) => {
    // ! 避免form的自带属性，一般将提交事件绑定在按钮 onClick触发
    evt.preventDefault();
    alert(`A name was submitted ${this.state.value}`);
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSumbit}>
        <label>
          input:
          <input type="text" value={value} onChange={this.handleChange} />
        </label>
        <br />
        <br />

        <label>
          textarea:
          <textarea value={value} onChange={this.handleChange} />
        </label>
        <br />
        <br />

        <label>
          select:
          <select value={value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <br />
        <br />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

// 2.处理多个输入元素
// 由于 setState() 自动将部分 state 合并到当前 state, 只需调用它更改部分 state 即可 // !
class NameForm2 extends PureComponent {
  state = {
    isGoing: true,
    numberOfGuests: 2,
  };

  handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { isGoing, numberOfGuests } = this.state;
    return (
      <form>
        <label>
          is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}

export default () => (
  <>
    <NameForm />
    <br />
    <br />
    <hr />
    <br />
    <br />
    <NameForm2 />
  </>
);
