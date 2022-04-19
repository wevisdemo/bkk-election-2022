import { DOMAttributes } from 'react';
import { PostCardProps } from './src/components/post-card';
import { SharerProps } from './src/components/sharer';

type CustomElement<T = {}> = Partial<T & DOMAttributes<T> & { children: any }>;
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ui-navbar': CustomElement;
      'ui-footer': CustomElement;
      'ui-post-card': CustomElement<PostCardProps>;
      'ui-sharer': CustomElement<SharerProps>;
    }
  }
}
