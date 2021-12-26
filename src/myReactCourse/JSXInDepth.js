import React from 'react';

function MyButton(props) {
  return (
    <div>
      color:{props.color}, shadowSize:{props.shadowSize}, children:
      {props.children}
    </div>
  );
}

const element = (
  <MyButton color={'blue'} shadowSize={1}>
    Click Me
  </MyButton>
);

const element2 = React.createElement(
  MyButton, // ! 1.自定义组件首字母大写
  {
    color: 'blue 2',
    shadowSize: 2,
  },
  'Click Me 2',
);

const ele = React.createElement(
  'h1', // ! 2.原生 DOM 标签
  {
    className: 'classValue',
    color: 'red',
  },
  '测试原生DOM标签',
);

console.log('element =>', element);
console.log('element2 =>', element2);
console.log('ele =>', ele);

//
//
// 在 JSX 类型中使用点语法
const MyComponent2 = {
  MyElement: (props) => {
    return <h1>hello, {props.name}</h1>;
  },
};

// 在运行时选择类型
const PhotoStory = (props) => {
  return <h2>props.storyType: {props.storyType}</h2>;
};

const VideoStory = (props) => {
  return <h4>props.storyType: {props.storyType}</h4>;
};

const components = {
  photo: PhotoStory,
  video: VideoStory,
};

const Story = (props) => {
  const StoryKlass = components[props.storyType]; // ! key-value对mapping形式的组件，调用方式2.先将它赋值给大写字母开头的变量
  return <StoryKlass {...props} />;
};

const element4 = (
  <div>
    <Story storyType={'photo'} />
    <Story storyType={'video'} />
  </div>
);

//
//
//
const MyElement6 = (props) => {
  /* 不建议使用默认属性为true */
  return <h1>hello, {props.autocomplete}</h1>;
};

//
//
// JSX 中的子元素
const MyElement8 = (props) => {
  return <h1>{props.children}</h1>;
};

const MyElement82 = () => {
  /* 混合不同类型的 children(子元素)  */
  return (
    <div>
      <h1>blabla</h1>
      <MyElement8>{'FOO'}</MyElement8>
    </div>
  );
};

// JS表达式作为子元素
const MyElement83 = () => {
  const todos = ['learn es6', 'learn redux'];
  return (
    <ul>
      {todos.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

// 函数作为子元素，（指的是生成组件的函数，函数式组件 or 类组件）// todo ?

const MyElement84 = () => {
  return (
    <div>
      <p style={{ textAlign: 'center', color: 'red' }}>
        布尔类型、Null 以及 Undefined 不会被渲染，将他们转换为字符串，才能渲染
      </p>
      <h1 date-type="{''}">{''}</h1>
      <h1 date-type="{false}">{false}</h1>
      <h1 date-type="{true}">{true}</h1>
      <h1 date-type="{null}">{null}</h1>
      <h1 date-type="{undefined}">{undefined}</h1>
      <br />
      <br />
      <br />
      <h2 style={{ color: 'red' }}>{[].length && <p>渲染</p>}</h2>
      <h5 style={{ color: 'blue' }}>
        {[].length === 0 && <p>左项是布尔值，才会渲染出[].length</p>}
      </h5>
      <h2 style={{ color: 'yellow' }}>{[].length > 0 && <h1>不渲染</h1>}</h2>
    </div>
  );
};

export default () => (
  <>
    {element}
    {element2}
    {ele}
    <hr />
    <hr />

    <MyComponent2.MyElement name={'ycg_ycg'} />
    <hr />
    <hr />

    {element4}
    <hr />
    <hr />

    <MyElement6 autocomplete />
    <MyElement6 autocomplete={true} />
    <hr />
    <hr />

    <MyElement8>字符串字面量 作为props.children</MyElement8>
    <MyElement82 />
    <MyElement83 />
    <hr />
    <hr />

    <MyElement84 />
  </>
);
