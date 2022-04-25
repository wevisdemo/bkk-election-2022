# UI package

Shared web component written by [SolidJS](https://www.solidjs.com/) and [Tailwind](https://tailwindcss.com/)

## Set up

Include the script and stylesheet

```html
<script src="/ui/ui.umd.js" async></script>
<link rel="stylesheet" href="/ui/style.css" />
```

Call `loadUIComponents` function when component is mounted

```ts
import { loadUIComponents } from 'ui';

// Call in React's useEffect, Vue's mount or Svelte's onMount
loadUIComponents();
```

## Components

### Navbar

```html
<ui-navbar></ui-navbar>
```

### Footer

```html
<ui-footer></ui-footer>
```

### PostCard

```html
<ui-post-card
  title="มองย้อนการเลือกตั้งผู้ว่าฯ กทม. 9 ปี ศึกชิงเมืองกรุงภายใต้การเมือง 2 พรรคใหญ่ ฝ่ายค้าน vs. รัฐบาล"
  link="https://thestandard.co/9-years-history-of-bangkok-governor-election/"
  date="28 มีนาคม 2565"
  image="https://thestandard.co/wp-content/uploads/2022/03/COVER-WEB-9-33-400x215.jpg"
></ui-post-card>
```

can set `loading` to be true to render skeleton animation while the data is not ready

```html
<ui-post-card loading="true"></ui-post-card>
```

## Utility classes

### Typography

Name is corresponded to the Figma

- **Heading:** `typo-h1` to `typo-h9`
- **Body:** `typo-b1` to `typo-b7`
- **UI:** `typo-u1` to `typo-u4`

### Skeleton

Use `ui-skeleton` to add background loading animation to an element. Useful for loading state.
