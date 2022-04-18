/* @refresh reload */
import { Component, createSignal, For, Show } from 'solid-js';
import { noShadowDOM } from 'component-register';
import pages from '../data/pages.json';

const Navbar: Component = () => {
  noShadowDOM();

  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  return (
    <div class="ui-relative ui-p-3 ui-flex ui-flex-col md:ui-flex-row ui-bg-white">
      <div className="ui-flex-1 ui-flex ui-flex-row ui-justify-between">
        <a href="/">
          <img
            src="/static/images/bkkelection-logo.png"
            alt="BKK Election 2022"
            class="ui-h-6 md:ui-h-8"
          />
        </a>

        <button
          class="md:ui-hidden ui-p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen())}
        >
          <Show
            when={isMenuOpen()}
            fallback={
              <svg width="16" height="12" viewBox="0 0 16 12" fill="black">
                <rect x="0.163574" width="15" height="2" />
                <rect x="0.163574" y="5" width="15" height="2" />
                <rect x="0.163574" y="10" width="15" height="2" />
              </svg>
            }
          >
            <svg width="13" height="14" viewBox="0 0 13 14" fill="black">
              <rect
                x="12.1846"
                y="2.38818"
                width="15"
                height="2"
                transform="rotate(135 12.1846 2.38818)"
              />
              <rect
                x="1.57764"
                y="1.00537"
                width="15"
                height="2"
                transform="rotate(45 1.57764 1.00537)"
              />
            </svg>
          </Show>
        </button>
      </div>

      <div
        class="ui-absolute ui-top-full md:ui-relative ui-inset-x-0 md:ui-flex ui-flex-col md:ui-flex-row ui-space-y-2 md:ui-space-y-0 md:ui-space-x-6 ui-bg-white ui-p-3 md:ui-p-0 ui-z-50"
        classList={{ 'ui-hidden': !isMenuOpen() }}
      >
        <For each={pages}>
          {({ label, href }) => (
            <a
              href={href}
              class="ui-h-full ui-py-1 ui-px-2 typo-u4 hover:ui-underline ui-flex ui-items-center ui-justify-end"
            >
              {label}
            </a>
          )}
        </For>
      </div>
    </div>
  );
};

export default Navbar;
