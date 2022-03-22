import { customElement } from 'solid-element';
import Navbar from './navbar';
import '../style.css';

window['registerUICustomElements'] = () => {
  customElement('ui-navbar', Navbar);
};
