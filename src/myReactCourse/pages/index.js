import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import routes from '../routes';

function RouterDemo() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            padding: '10px',
            width: 300,
            background: '#f0f0f0',
          }}
        >
          <ul>
            {routes.map(({ path, name }) => (
              <li key={name}>
                <Link to={path}>{name}</Link>
              </li>
            ))}
          </ul>
          <hr />
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.hasOwnProperty('exact') ? route.exact : true}
                component={route.sidebar}
              />
            ))}
          </Switch>
        </div>

        <div style={{ flex: 1, padding: '10px' }}>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.hasOwnProperty('exact') ? route.exact : true}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default () => {
  ReactDOM.render(<RouterDemo />, document.getElementById('root'));
};
