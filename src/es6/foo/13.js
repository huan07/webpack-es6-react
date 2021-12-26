/**
 * Created by yangHuan on 17/10/27.
 */

// Reflect.get 第一个参数不是对象，会报错的
{
  var myObject = {
    foo: 11,
    bar: 22,
    get baz() {
      return this.foo + this.bar;
    },
  };
  console.log(Reflect.get(myObject, 'foo'), Reflect.get(myObject, 'bar'));
  console.log(Reflect.get(myObject, 'baz'));

  var myReceiverObject = {
    foo: 4,
    bar: 5,
  };
  console.log(myObject, 'baz', myReceiverObject);
}

// Reflect.set 第一个参数不是对象，会报错的
{
  var myObject = {
    foo: 66,
    set bar(value) {
      return (this.foo = value);
    },
  };
  console.log(myObject.foo);

  Reflect.set(myObject, 'foo', 77);
  console.log(myObject.foo);

  var myReceiverObject = {
    foo: 0,
  };
  Reflect.set(myObject, 'foo', 100, myReceiverObject);
  console.log(myObject.foo, myReceiverObject.foo);
}

// Proxy 对象和 Reflect 对象联合使用，
// 前者拦截赋值操作，后者完成赋值的默认行为
// 传入了receiver，那么Reflect.set会触发Proxy.defineProperty拦截？？？？
