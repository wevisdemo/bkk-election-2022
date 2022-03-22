import type { Component } from 'solid-js';
import { register, compose, noShadowDOM } from 'component-register';
import { withSolid } from 'solid-element';

const Navbar: Component = () => {
  noShadowDOM();
  return <div class="typo-h3">Navbar test</div>;
};

compose(register('ui-navbar'), withSolid)(Navbar);
