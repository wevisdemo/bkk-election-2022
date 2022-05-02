import type { DetailedHTMLProps } from 'react';

type CustomElement<T = {}> = DetailedHTMLProps<T, HTMLElement>;
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ui-navbar': CustomElement;
      'ui-footer': CustomElement;
      'ui-post-card': CustomElement<{
        title: string;
        image: string;
        date: string;
        link: string;
        loading?: string;
      }>;
      'ui-sharer': CustomElement<{
        url?: string;
        hideLabel?: boolean;
      }>;
    }
  }
}
