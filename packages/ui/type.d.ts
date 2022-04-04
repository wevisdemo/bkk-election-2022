export {};
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ui-navbar': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }

    interface IntrinsicElements {
      'ui-footer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }

    interface Props {
      title: string;
      link: string;
      date: string;
      image: string;
    }

    interface IntrinsicElements {
      'ui-post-card': React.DetailedHTMLProps<Props, HTMLElement>;
    }
  }
}
