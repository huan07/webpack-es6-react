// `` 模版字符串
// 当作普通字符串、
// 定义多行字符串、
// 在字符串中嵌入变量
{
  const name = 'Bob';

  const result = `Hello ${name}, 
    ${'? ? ?'}`;
  console.log('模版字符串 => ', result);

  const greeting = `\`Yo\` World`;
  console.log('greeting => ', greeting);
}
