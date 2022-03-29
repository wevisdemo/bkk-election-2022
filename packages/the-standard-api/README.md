# The Standard API Package

Provide function to get posts from [The Standard](https://thestandard.co) Wordpress

## Setup

Add `the-standard-api` in app's package.json dependecies

```json
"dependencies": {
  "the-standard-api": "*",
},
```

## Usage

Import and call the function

```ts
import { fetchElectionPosts } from 'the-standard-api';

const posts = await fetchElectionPosts();
```

`fetchElectionPosts` function receive optional options object which can specify

- `limit` amount of latest posts
- `candidateName` to limit posts to some specifig candidate

The function return `Promise<Post[]>`

```ts
export interface Post {
  id: number;
  title: string;
  image: string;
  date: string;
  link: string;
}

export async function fetchElectionPosts({
  limit = 6,
  candidateName = '',
} = {}): Promise<Post[]>;
```
