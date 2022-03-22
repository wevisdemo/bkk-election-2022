import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div>
      <ui-navbar></ui-navbar>
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <div className="space-y-2">
        <p className="typo-h1">h1</p>
        <p className="typo-h2">h2</p>
        <p className="typo-h3">h3</p>
        <p className="typo-h4">h4</p>
        <p className="typo-h5">h5</p>
        <p className="typo-h6">h6</p>
        <p className="typo-h7">h7</p>
        <p className="typo-h8">h8</p>
        <p className="typo-h9">h9</p>

        <p className="typo-b1">
          <span className="font-bold">b1</span>
          <span>b1</span>
        </p>
        <p className="typo-b2">
          <span className="font-bold">b2</span>
          <span>b2</span>
        </p>
        <p className="typo-b3">
          <span className="font-bold">b3</span>
          <span>b3</span>
        </p>
        <p className="typo-b4">
          <span className="font-bold">b4</span>
          <span>b4</span>
        </p>
        <p className="typo-b5">
          <span className="font-bold">b5</span>
          <span>b5</span>
        </p>
        <p className="typo-b6">
          <span className="font-bold">b6</span>
          <span>b6</span>
        </p>
        <p className="typo-b7">
          <span className="font-bold">b7</span>
          <span>b7</span>
        </p>

        <p className="typo-u1">
          <span className="font-semibold">u1</span>
          <span>u1</span>
        </p>
        <p className="typo-u2">
          <span className="font-semibold">u2</span>
          <span>u2</span>
        </p>
        <p className="typo-u3">
          <span className="font-semibold">u3</span>
          <span>u3</span>
        </p>
        <p className="typo-u4">
          <span className="font-semibold">u4</span>
          <span>u4</span>
        </p>
        <p className="typo-u5">
          <span className="font-semibold">u5</span>
          <span>u5</span>
        </p>
      </div>
    </div>
  );
};

export default Home;
