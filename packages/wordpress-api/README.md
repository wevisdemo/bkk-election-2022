# WordPress API Package

Provide function to get posts from [The Standard](https://thestandard.co) and [Wevis](https://wevis.info) Wordpress

## Setup

Add `wordpress-api` in app's package.json dependecies

```json
"dependencies": {
  "wordpress-api": "*",
},
```

## Usage

Import and call the function

```ts
import {
  fetchTheStandardElectionPosts,
  fetchWeVisElectionPosts,
} from 'wordpress-api';

const theStandardPosts = await fetchTheStandardElectionPosts();
const weVisPosts = await fetchWeVisElectionPosts();
```

`fetchTheStandardElectionPosts` and `fetchWeVisElectionPosts` functions receive optional options object which can specify

- `limit` amount of latest posts
- `tag` additional tag to filter posts

The function return `Promise<Post[]>`

```ts
export interface Post {
  id: number;
  title: string;
  image: string;
  date: string;
  link: string;
}

export async function fetch{TheStandard/WeVis}ElectionPosts({
  limit = 6,
  tag = '',
} = {}): Promise<Post[]>;
```
