import React from 'react';
import Loadable from 'react-loadable';

//
import StateAndLifecycle from '../StateAndLifecycle';
import State from '../State';
import State2 from '../State2';
import State3 from '../State3';

const routes = [
  {
    path: '/',
    name: 'name 样板',
    sidebar: () => <>sidebar</>,
    main: () => <>main</>,
  },
  //
  {
    path: '/JSX',
    name: 'x JSX',
    main: Loadable({
      loader: () => import('../JSX'),
      loading: () => 'loading...',
    }),
  },
  {
    path: '/JSXInDepth',
    name: 'x 深入JSX',
    main: Loadable({
      loader: () => import('../JSXInDepth'), // ? 需要刷新下看到console打印输出
      loading: () => 'loading...',
    }),
  },
  {
    path: '/createElement',
    name: 'x createElement demo',
    main: Loadable({
      loader: () => import('../React.createElement'),
      loading: () => 'loading...',
    }),
  },
  {
    path: '/Component',
    name: 'x 函数组件',
    main: Loadable({
      loader: () => import('../Component'),
      loading: () => 'loading...',
    }),
  },
  {
    path: '/Component2',
    name: 'x class 组件',
    main: Loadable({
      loader: () => import('../Component2'),
      loading: () => 'loading...',
    }),
  },
  //
  {
    path: '/StateAndLifecycle',
    name: 'x State & 生命周期',
    main: StateAndLifecycle,
  },
  {
    path: '/State',
    name: 'x 正确地使用State',
    main: State,
  },
  {
    path: '/State2',
    name: 'setState的浅合并',
    main: State2,
  },
  {
    path: '/State3',
    name: 'todo setState异步、同步执行',
    main: State3,
  },
  //
  {
    path: '/Lifecycle',
    name: 'Lifecycle 挂载阶段',
    main: Loadable({
      loader: () => import('../Lifecycle'),
      loading: () => 'loading...',
    }),
  },
  {
    path: '/Lifecycle2',
    name: 'Lifecycle2 更新阶段',
    main: Loadable({
      loader: () => import('../Lifecycle2'),
      loading: () => 'loading...',
    }),
  },
  {
    path: '/OP_shouldComponentUpdate',
    name: 'OP_shouldComponentUpdate 浅比较',
    main: Loadable({
      loader: () => import('../OP_shouldComponentUpdate'),
      loading: () => 'loading...',
    }),
  },
  //
  {
    path: '/ConditionalRendering',
    name: 'x 条件渲染',
    main: Loadable({
      // 状态提升
      loader: () => import('../ConditionalRendering'),
      loading: () => 'loading...',
    }),
  },
  {
    path: '/ConditionalRendering2',
    name: 'x 条件渲染2',
    main: Loadable({
      loader: () => import('../ConditionalRendering2'),
      loading: () => 'loading...',
    }),
  },
  {
    path: '/ListsAndKeys',
    name: 'x 列表 & Key',
    main: Loadable({
      loader: () => import('../ListsAndKeys'),
      loading: () => 'loading...',
    }),
  },
  //
  {
    path: '/HandlingEvents',
    name: 'x 事件处理',
    main: Loadable({
      loader: () => import('../HandlingEvents'), // * setState的使用方式
      loading: () => 'loading...',
    }),
  },
  {
    path: '/ControlledComponents',
    name: 'x 受控组件',
    main: Loadable({
      loader: () => import('../ControlledComponents'), // * setState的使用方式
      loading: () => 'loading...',
    }),
  },
  {
    path: '/UnControlledComponents',
    name: 'x 非受控组件',
    main: Loadable({
      loader: () => import('../UnControlledComponents'),
      loading: () => 'loading...',
    }),
  },
  //
  {
    path: '/LiftingStateUp',
    name: 'todo 状态提升',
    main: Loadable({
      loader: () => import('../LiftingStateUp'),
      loading: () => 'loading...',
    }),
  },
  {
    path: '/RefsAndTheDOM',
    name: 'x RefsAndTheDOM', // 父组件调用子组件中的方法
    main: Loadable({
      loader: () => import('../RefsAndTheDOM'),
      loading: () => 'loading...',
    }),
  },
  {
    path: '/RenderProps',
    name: 'x Render Props',
    main: Loadable({
      loader: () => import('../RenderProps'),
      loading: () => 'loading...',
    }),
  },
];

export default routes;

// todo
// Context
// Render Props
// 高阶组件
