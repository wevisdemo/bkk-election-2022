/* @refresh reload */
import type { Component } from 'solid-js';
import { render } from 'solid-js/web';

import './components/index';

const App: Component = () => {
  return (
    <div>
      <h1 className="typo-h1">iuygi</h1>
      <ui-navbar></ui-navbar>
    </div>
  );
};

render(() => <App />, document.getElementById('root') as HTMLElement);
