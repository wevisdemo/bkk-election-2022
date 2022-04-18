import { customElement } from 'solid-element';
import Navbar from './navbar';
import Footer from './footer';
import PostCard, { postCardDefaultProps } from './post-card';
import '../style.css';

customElement('ui-navbar', Navbar);
customElement('ui-footer', Footer);
customElement('ui-post-card', postCardDefaultProps, PostCard);
