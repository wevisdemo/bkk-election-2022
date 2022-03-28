import 'cross-fetch/polyfill';
import { fetchElectionPosts } from '.';

fetchElectionPosts().then((posts) => console.log(posts));
