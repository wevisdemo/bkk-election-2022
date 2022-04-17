import { FunctionComponent } from 'react';
import Head from 'next/head';

interface MetadataProps {
  title?: string;
  imageSrc?: string;
}

const description = 'ติดตามข้อมูลเกี่ยวกับการเลือกตั้ง กทม. 2022 ได้ที่นี่';

const Metadata: FunctionComponent<MetadataProps> = ({ title, imageSrc }) => {
  const fullTitle = `${title} - Bangkok Election 2022`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageSrc || ''} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Metadata;
