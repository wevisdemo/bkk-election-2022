/* @refresh reload */
import { Component, For } from 'solid-js';
import { noShadowDOM } from 'component-register';

interface PostCardProps {
  title: string;
  image: string;
  date: string;
  link: string;
}

export const postCardDefaultProps: PostCardProps = {
  title: '',
  image: '',
  date: '',
  link: '',
};

const PostCard: Component<PostCardProps> = ({ title, image, date, link }) => {
  noShadowDOM();

  return (
    <div class="ui-flex ui-flex-col ui-space-y-6">
      <img src={image} alt={title} />
      <p class="typo-h9">{title}</p>
      <div class="ui-flex ui-flex-row typo-u5">
        <p class="ui-opacity-50 ui-flex-1">{date}</p>
        <a
          href={link}
          target="_blank"
          class="ui-font-bold ui-flex ui-flex-row ui-space-x-1"
        >
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
        </a>
      </div>
    </div>
  );
};

export default PostCard;
