/* @refresh reload */
import { Component, Show } from 'solid-js';
import { noShadowDOM } from 'component-register';
import DOMPurify from 'dompurify';
export interface PostCardProps {
  title: string;
  image: string;
  date: string;
  link: string;
  loading: boolean;
}

export const postCardDefaultProps: PostCardProps = {
  title: '',
  image: '',
  date: '',
  link: '',
  loading: false,
};

const PostCard: Component<PostCardProps> = ({
  title,
  image,
  date,
  link,
  loading,
}) => {
  noShadowDOM();

  return (
    <Show
      when={!loading}
      fallback={
        <div class="ui-flex ui-flex-col ui-space-y-4 md:ui-space-y-6">
          <div class="ui-skeleton ui-h-36 md:ui-h-52" />
          <div class="ui-skeleton ui-h-8 md:ui-h-10" />
          <div class="ui-skeleton ui-h-3 md:ui-h-4" />
        </div>
      }
    >
      <a
        class="ui-group ui-flex ui-flex-col ui-space-y-4 md:ui-space-y-6"
        href={link}
        target="_blank"
      >
        <img
          src={image}
          alt={title}
          class="ui-border-2 ui-border-transparent group-hover:ui-border-black"
        />
        <p
          class="typo-news-headline group-hover:ui-underline"
          innerHTML={DOMPurify.sanitize(title)}
        />
        <div class="ui-flex ui-flex-row typo-u5">
          <p class="ui-opacity-50 ui-flex-1">{date}</p>
          <div class="ui-font-bold ui-flex ui-flex-row ui-space-x-1">
            <span class="ui-underline">อ่านต่อ</span>
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none">
              <path d="M6 10.0001L14 2.00012" stroke="black" stroke-width="2" />
              <path d="M7 1.00012H15V9.00012" stroke="black" stroke-width="2" />
              <path
                d="M11 9.85726V15.0001H1V5.00012H6.14286"
                stroke="black"
                stroke-width="2"
              />
            </svg>
          </div>
        </div>
      </a>
    </Show>
  );
};

export default PostCard;
