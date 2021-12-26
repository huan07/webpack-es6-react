/**
 * Created by yanghuan on 18/7/22.
 */

export default (url) => {
  const promise = new Promise(function (resolve, reject) {
    const handler = function () {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200 || this.status === 304) {
        resolve(this);
      } else {
        reject(new Error(this.statusText));
      }
    };

    const client = new XMLHttpRequest();
    client.onreadystatechange = handler;

    client.open('GET', url, true); // 第三个参数表示请求是否为异步，默认为true

    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');

    client.send();
  });
  return promise;
};
