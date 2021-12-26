// Map
{
  const data = {};
  const element = document.getElementById('app');
  data[element] = 'metadata'; // 由于对象只接受字符串作为键名，element 被自动转为字符串[object HTMLDivElement]
  console.error('data =>', data, data['[object HTMLDivElement]']);

  // Map 数据结构，也是键值对的集合（它类似于对象，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键）
  // set/get, delete, has, clear
  {
    const m = new Map();
    const o = { p: 'hello baidu' };

    m.set(o, 'baidu'); // 返回的是当前的 Map 对象，可以采用链式写法
    console.warn('m =>', m, m.get(o), m.size);
    console.log(m.has(o));

    m.delete(o);
    console.log(m.has(o));
  }

  // Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组
  // keys(), values(), entries(), forEach()
  {
    const arr = [
      ['name', '张三'],
      ['title', 'author'],
    ];

    const m2 = new Map(arr);

    console.warn('m2 =>', m2, m2.get('name'), m2.size, m2.has('name'));

    for (let key of m2.keys()) {
      console.log('key =>', key);
    }

    for (let value of m2.values()) {
      console.log('value =>', value);
    }

    for (let [key, value] of m2.entries()) {
      console.log('key, value =>', key, value);
    }

    console.log(m2[Symbol.iterator] === m2.entries); // !!
    for (let [key, value] of m2) {
      console.log('key, value 2 =>', key, value);
    }

    {
      // Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）
      const m2 = new Map(arr);

      const _keys = m2.keys();
      const _values = m2.values();
      const _entries = m2.entries();

      console.warn(_keys, _values, _entries);
      console.warn([...m2], [..._keys], [..._values], [..._entries]);
    }
  }
}

// WeakMap
// a.WeakMap 只接受对象作为键名（不可以是 null）
// b.WeakMap 键名所引用的对象都是弱引用（键名所指向的对象，不计入垃圾回收机制）
{
  const key = [1, 2];
  const key2 = { 3: 4 };

  const wm = new WeakMap();
  wm.set(key, 'array');
  wm.set(key2, 'object');

  console.log('wm =>', wm, wm.get(key), wm.get(key2));

  const wm2 = new WeakMap([
    [key, 'foo'],
    [key2, 'bar'],
  ]);

  console.log('wm2 =>', wm2, wm2.get(key), wm2.get(key2));

  // ! WeakMap 的用途
  // WeakMap 的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏
  {
    // a.DOM 节点作为键名
    // 键名就是这个节点对象。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险
    window.onload = function () {
      let element = document.querySelector('#iframe');

      const wm = new WeakMap();
      wm.set(element, { timesClicked: 0 });

      element.addEventListener(
        'click',
        function () {
          const logoData = wm.get(element);
          logoData.timesClicked++;

          console.log('logoData.timesClicked => ', logoData.timesClicked);
          console.log(wm);
        },
        false,
      );
    };

    // b.部署私有属性
    const _counter = new WeakMap();
    const _action = new WeakMap();

    class Countdown {
      constructor(counter, action) {
        _counter.set(this, counter);
        _action.set(this, action);
      }

      dec() {
        let counter = _counter.get(this);

        console.log('部署私有属性 counter =>', counter);

        if (counter < 1) {
          return;
        }

        counter--;
        _counter.set(this, counter);

        if (counter === 0) {
          _action.get(this)();
        }
      }
    }

    const c = new Countdown(2, () => console.log('done !'));
    c.dec();
    c.dec();
    c.dec();
  }
}
