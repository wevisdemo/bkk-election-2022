/* @refresh reload */
import type { Component } from 'solid-js';
import { render } from 'solid-js/web';

import './components/index';

const App: Component = () => {
  return (
    <div>
      <ui-navbar></ui-navbar>
      <div>
        <h1 className="typo-h3">UI Library</h1>
      </div>
    </div>
  );
};

render(() => <App />, document.getElementById('root') as HTMLElement);
