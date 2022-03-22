import type { Component } from 'solid-js';
import { noShadowDOM } from 'component-register';

const Navbar: Component = () => {
  noShadowDOM();
  return <div class="typo-h3">Navbar test</div>;
};

export default Navbar;
