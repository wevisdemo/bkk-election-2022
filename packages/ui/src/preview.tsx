/* @refresh reload */
import { Component } from 'solid-js';
import { render } from 'solid-js/web';
import './components/index';

const App: Component = () => {
  return (
    <div
      style={{
        'min-height': '100vh',
        display: 'flex',
        'flex-direction': 'column',
      }}
    >
      <ui-navbar></ui-navbar>
      <div style={{ padding: '20px', width: '400px' }}>
        <ui-post-card
          title="มองย้อนการเลือกตั้งผู้ว่าฯ กทม. 9 ปี ศึกชิงเมืองกรุงภายใต้การเมือง 2 พรรคใหญ่ ฝ่ายค้าน vs. รัฐบาล"
          link="https://thestandard.co/9-years-history-of-bangkok-governor-election/"
          date="28 มีนาคม 2565"
          image="https://thestandard.co/wp-content/uploads/2022/03/COVER-WEB-9-33-400x215.jpg"
        ></ui-post-card>
      </div>
      <div
        style={{
          'background-color': 'gray',
          padding: '20px',
        }}
      >
        <ui-sharer url="test"></ui-sharer>
      </div>
      <ui-footer></ui-footer>
    </div>
  );
};

render(() => <App />, document.getElementById('root') as HTMLElement);
