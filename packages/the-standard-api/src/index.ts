import type { WP_REST_API_Post, WP_REST_API_Attachment } from 'wp-types';

const API_ROOT = 'https://thestandard.co/wp-json/wp/v2';
const BKK_ELECTION_TAG_ID = 47793; // https://thestandard.co/wp-json/wp/v2/tags?slug=bkkelection2022
const MEDIA_TARGET_SIZE = 'newsthumb-small';

export interface Post {
  id: number;
  title: string;
  imageUrl: string;
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

export async function fetchElectionPosts(): Promise<Post[]> {
  const res = await fetch(
    `${API_ROOT}/posts?tags=${BKK_ELECTION_TAG_ID}&_embed=wp:featuredmedia&_fields=id,title,link,date,_links.wp:featuredmedia,_embedded.wp:featuredmedia`
  );

  const posts = (await res.json()) as WP_REST_API_Post[];

  return posts.map<Post>(({ id, title, link, date, _embedded }) => {
    const [media] = _embedded?.['wp:featuredmedia'] as WP_REST_API_Attachment[];

    return {
      id,
      title: title.rendered,
      link,
      date: new Date(date).toLocaleDateString('th-TH', {
        dateStyle: 'long',
      }),
      imageUrl: (media.media_details.sizes as MediaSizes)[MEDIA_TARGET_SIZE]
        .source_url,
    };
  });
}
