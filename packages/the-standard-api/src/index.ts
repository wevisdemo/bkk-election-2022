import type {
  WP_REST_API_Post,
  WP_REST_API_Attachment,
  WP_REST_API_Tag,
} from 'wp-types';

const API_ROOT = 'https://thestandard.co/wp-json/wp/v2';
const BKK_ELECTION_TAG_ID = 47793; // https://thestandard.co/wp-json/wp/v2/tags?slug=bkkelection2022
const MEDIA_TARGET_SIZE = 'newsthumb-small';

export interface Post {
  id: number;
  title: string;
  image: string;
  date: string;
  link: string;
}

type MediaSizes = {
  [size: string]: {
    file: string;
    width: number;
    height: number;
    mime_type: string;
    source_url: string;
  };
};

type URLParamaters = {
  [key: string]: string | number;
};

function parseParams(params?: URLParamaters): string {
  return params
    ? `?${Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    : '';
}

async function fetchApi<T>(
  endpoint: string,
  params?: URLParamaters
): Promise<T> {
  const res = await fetch(API_ROOT + endpoint + parseParams(params));
  return await res.json();
}

export async function fetchElectionPosts({
  limit = 6,
  candidateName = '',
} = {}): Promise<Post[]> {
  const tags = candidateName
    ? (
        await fetchApi<WP_REST_API_Tag[]>('/tags', {
          search: candidateName,
          _fields: 'id',
          per_page: 1,
        })
      )[0].id
    : BKK_ELECTION_TAG_ID;

  const posts = await fetchApi<WP_REST_API_Post[]>('/posts', {
    tags,
    _embed: 'wp:featuredmedia',
    _fields:
      'id,title,link,date,tags,_links.wp:featuredmedia,_embedded.wp:featuredmedia',
    per_page: limit,
  });

  return posts
    .filter(({ tags }) => !candidateName || tags?.includes(BKK_ELECTION_TAG_ID))
    .map<Post>(({ id, title, link, date, _embedded }) => {
      const [media] = _embedded?.[
        'wp:featuredmedia'
      ] as WP_REST_API_Attachment[];

      return {
        id,
        title: title.rendered,
        link,
        date: new Date(date).toLocaleDateString('th-TH', {
          dateStyle: 'long',
        }),
        image: (media.media_details.sizes as MediaSizes)[MEDIA_TARGET_SIZE]
          .source_url,
      };
    });
}
