import React, {
  PureComponent,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import CustomTextInput from './UnControlledComponents';

// 1.1 为 DOM 元素添加 ref
// 参照非受控组件demo

// 1.2 为 class 组件添加 ref // ** 1.在类组件中调用子组件（>= react@16.4），可以使用 createRef
class CustomTextInput12 extends PureComponent {
  textInput = React.createRef();

  componentDidMount() {
    console.log(
      '为 class 组件添加 Ref',
      this.textInput,
      this.textInput.current,
    );

    this.textInput.current.focusTextInput();
  }

  render() {
    return <CustomTextInput ref={this.textInput} />;
  }
}

// !
// 你不能在函数组件上使用 ref 属性，因为他们没有实例，你可以使用 forwardRef（可与 useImperativeHandle 结合使用）
// 可以在函数组件内部使用 ref 属性，只要它指向一个 DOM 元素或 class 组件 // !
function CustomTextInputFun(props) {
  // textInput必须在这里声明，所以 ref 回调可以引用它
  const inputRef = useRef(null);

  function handleClick() {
    console.log('CustomTextInputFun inputRef =>', inputRef, inputRef.current);

    inputRef.current.focus();
  }

  return (
    <div>
      <input type="text" ref={inputRef} />
      <input
        type="button"
        value="Focus the text input funciton"
        onClick={handleClick}
      />
    </div>
  );
}

// ** 2.在函数组件中调用子组件（>= react@16.8），可以使用 useRef 和 useImperativeHandle
const Child = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    getAlert() {
      alert('getAlert from Child');
    },
  }));
  return <h1>Hi</h1>;
});

const Parent = () => {
  const childRef = useRef();
  return (
    <div>
      <Child ref={childRef} />
      <button onClick={() => childRef.current.getAlert()}>Click</button>
    </div>
  );
};

// 2. 回调 Refs
class CustomTextInput2 extends PureComponent {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = (element) => {
      // ! 在生命周期中只执行一次，回调函数可以写在此方法中
      this.textInput = element;
    };

    this.focusTextInput = () => {
      console.log('回调 Refs', this.textInput);

      this.textInput.focus();
    };
  }

  componentDidMount() {
    // this.focusTextInput(); // todo 测试
  }

  render() {
    return (
      <>
        <input type="text" ref={this.setTextInputRef} />
        <input
          type="button"
          value="Focus the text input2"
          onClick={this.focusTextInput}
        />
      </>
    );
  }
}

// 3. String 类型的 Refs（过时的 API, string 类型的 refs 存在一些问题，效率问题？）
class CustomTextInput3 extends PureComponent {
  // 我自己写的呵
  componentDidMount() {
    this.textInputX = this.refs.textInput;
  }

  focusTextInputX = () => {
    console.log('String 类型的 Refs', this.refs, this.textInputX);

    this.textInputX.focus();
  };

  render() {
    return (
      <>
        <input type="text" ref="textInput" />
        <input
          type="button"
          value="Focus the text input3 已过时，不要用"
          onClick={this.focusTextInputX}
        />
      </>
    );
  }
}

export default () => (
  <>
    <CustomTextInput />
    <br />
    <CustomTextInput12 />
    <br />
    <CustomTextInputFun />
    <Parent />
    <hr />

    <div>使用 ref 回调函数</div>
    <CustomTextInput2 />
    <hr />

    <CustomTextInput3 />
  </>
);
