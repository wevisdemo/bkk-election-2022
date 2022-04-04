import { createPostsFetcher, Post, SiteConfig } from './api';

const theStandardConfig: SiteConfig = {
  apiRoot: 'https://thestandard.co/wp-json/wp/v2',
  electionTagId: 47793, // https://thestandard.co/wp-json/wp/v2/tags?slug=bkkelection2022,
  mediaTargetSize: 'newsthumb-small',
};

const weVisConfig: SiteConfig = {
  apiRoot: 'https://wevis.info/wp-json/wp/v2',
  electionTagId: 17, // https://wevis.info/wp-json/wp/v2/tags?search=เลือกตั้ง,
  mediaTargetSize: 'small-thumb',
};

export { Post };

export const fetchTheStandardElectionPosts =
  createPostsFetcher(theStandardConfig);

export const fetchWeVisElectionPosts = createPostsFetcher(weVisConfig);
