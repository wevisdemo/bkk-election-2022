/* @refresh reload */
import { Component, onMount } from 'solid-js';
import { render } from 'solid-js/web';

import './components/index';

const App: Component = () => {
  onMount(() => {
    // @ts-ignore
    window.registerUICustomElements();
  });

  return (
    <div
      style={{
        'min-height': '100vh',
        display: 'flex',
        'flex-direction': 'column',
      }}
    >
      <ui-navbar></ui-navbar>
      <div style={{ flex: 1, padding: '20px' }}>
        <h1 className="typo-h3">UI Library</h1>
      </div>
      <ui-footer></ui-footer>
    </div>
  );
};

render(() => <App />, document.getElementById('root') as HTMLElement);
