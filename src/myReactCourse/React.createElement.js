import React, { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';

class Demo extends PureComponent {
  static propTypes = {
    links: PropTypes.array,
    onAdd: PropTypes.func,
    linkElement: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  };

  static defaultProps = {
    links: [],
    onAdd: () => {},
    linkElement: 'a',
  };

  render() {
    const { links, onAdd, linkElement } = this.props;
    return (
      <div>
        {links.map((link) =>
          createElement(
            linkElement,
            {
              key: `linkGroup-item-${link.title}`,
              to: link.href,
              href: link.href,
            },
            link.title,
          ),
        )}
        {
          <button type="button" onClick={onAdd}>
            点我!
          </button>
        }
      </div>
    );
  }
}

export default () => (
  <>
    <Demo
      links={[
        {
          title: '操作一',
          href: 'http://www.baidu.com',
        },
        {
          title: '操作二',
          href: 'http://react.html.cn/docs/render-props.html',
        },
      ]}
      onAdd={() => {
        console.log('div tag');
      }}
      linkElement="div"
    />
    <hr />
    <Demo
      links={[
        {
          title: '操作一',
          href: '',
        },
      ]}
      onAdd={() => {
        console.log('span tag');
      }}
      linkElement="span"
    />
  </>
);
