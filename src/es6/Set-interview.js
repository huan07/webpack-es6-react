{
  // Set 对象确实会删除重复项，
  const mySet = new Set([{ a: 1 }, { a: 1 }]);
  const result = [...mySet];
  console.log(result);
  //
  {
    const obj = { a: 1 };
    const mySet = new Set([obj, obj]);
    const result = [...mySet];
    console.log(result);
  }
}
