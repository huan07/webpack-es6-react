import React, { PureComponent, createRef } from 'react';

// 默认值
// <input type="radio"> 和 <input type="checkbox">支持 defaultChecked，
// 而 <input> <textarea> 和 <select>支持 defaultValue.
class NameForm extends PureComponent {
  textInput = createRef();

  focusTextInput = () => {
    console.warn('为 DOM 元素添加 ref', this.textInput);

    this.textInput.current.focus();
  };

  handleSumbit = (evt) => {
    evt.preventDefault();
    alert(`A name was submitted ${this.textInput.current.value}`);
  };

  render() {
    return (
      <form onSubmit={this.handleSumbit}>
        <label>
          input:
          <input type="text" defaultValue="Bob" ref={this.textInput} />
        </label>

        <br />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
        <br />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NameForm;
