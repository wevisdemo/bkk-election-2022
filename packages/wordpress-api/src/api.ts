import type {
  WP_REST_API_Post,
  WP_REST_API_Attachment,
  WP_REST_API_Tag,
} from 'wp-types';

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

export interface SiteConfig {
  apiRoot: string;
  electionTagId: number;
  mediaTargetSize: string;
}

function parseParams(params?: URLParamaters): string {
  return params
    ? `?${Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    : '';
}

export const createPostsFetcher =
  ({ apiRoot, electionTagId, mediaTargetSize }: SiteConfig) =>
  async ({ limit = 6, candidateName = '' } = {}): Promise<Post[]> => {
    const fetchApi = async <T>(
      endpoint: string,
      params?: URLParamaters
    ): Promise<T> => {
      const res = await fetch(apiRoot + endpoint + parseParams(params));
      return await res.json();
    };

    const tags = candidateName
      ? (
          await fetchApi<WP_REST_API_Tag[]>('/tags', {
            search: candidateName,
            _fields: 'id',
            per_page: 1,
          })
        )[0].id
      : electionTagId;

    const posts = await fetchApi<WP_REST_API_Post[]>('/posts', {
      tags,
      _embed: 'wp:featuredmedia',
      _fields:
        'id,title,link,date,tags,_links.wp:featuredmedia,_embedded.wp:featuredmedia',
      per_page: limit,
    });

    return posts
      .filter(({ tags }) => !candidateName || tags?.includes(electionTagId))
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
          image: (media.media_details.sizes as MediaSizes)[mediaTargetSize]
            .source_url,
        };
      });
  };
