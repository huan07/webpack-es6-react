import pages from '../pages/index';

pages();
if (module.hot) {
  module.hot.accept('../pages/index', () => {
    const newPages = require('../pages/index').default;
    newPages();
  });
}
