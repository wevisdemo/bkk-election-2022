import { customElement } from 'solid-element';
import Navbar from './navbar';
import Footer from './footer';
import '../style.css';

window['registerUICustomElements'] = () => {
  customElement('ui-navbar', Navbar);
  customElement('ui-footer', Footer);
};
