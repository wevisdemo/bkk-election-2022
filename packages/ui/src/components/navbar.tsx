import { Component, createSignal, For, Show } from 'solid-js';
import { noShadowDOM } from 'component-register';

const pages = [
  { label: 'ข้อมูลผู้สมัคร', href: '/candidates' },
  { label: 'ประวัติการลงคะแนน', href: '#' },
  { label: 'เลือกอย่างไร?', href: '#' },
  { label: 'Facts', href: '#' },
  { label: 'เกี่ยวกับเว็บไซต์นี้', href: '#' },
];

const Navbar: Component = () => {
  noShadowDOM();

  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  return (
    <div class="relative p-3 flex flex-col md:flex-row bg-white">
      <div className="flex-1 flex flex-row justify-between">
        <a href="/">
          <img
            src="/static/bkkelection-logo.png"
            alt="BKK Election 2022"
            class="h-6 md:h-8"
          />
        </a>

        <button
          class="md:hidden p-2"
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
        class="absolute top-full md:relative inset-x-0 md:flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 bg-white p-3 md:p-0"
        classList={{ hidden: !isMenuOpen() }}
      >
        <For each={pages} fallback={<div>Loading...</div>}>
          {({ label, href }) => (
            <a
              href={href}
              class="h-full py-1 px-2 typo-u4 hover:underline flex items-center justify-end"
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
