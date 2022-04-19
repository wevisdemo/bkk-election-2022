export default [
  { label: 'หนัาหลัก', href: '/' },
  { label: 'ข้อมูลผู้สมัคร', href: '/candidate' },
  { label: 'เทรนด์โซเชียล', href: '/socialtrend' },
  ...(import.meta.env.VITE_BUILD_ENV === 'PRODUCTION'
    ? []
    : [{ label: 'ผลการเลือกตั้ง', href: '/map' }]),
  { label: 'เกี่ยวกับเว็บไซต์นี้', href: '/about' },
];
