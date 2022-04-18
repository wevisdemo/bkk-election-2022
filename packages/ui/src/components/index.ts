import { customElement } from 'solid-element';
import Navbar from './navbar';
import Footer from './footer';
import PostCard, { postCardDefaultProps } from './post-card';
import Sharer, { sharerDefaultProps } from './sharer';

import '../style.css';

customElement('ui-navbar', Navbar);
customElement('ui-footer', Footer);
customElement('ui-post-card', postCardDefaultProps, PostCard);
customElement('ui-sharer', sharerDefaultProps, Sharer);
