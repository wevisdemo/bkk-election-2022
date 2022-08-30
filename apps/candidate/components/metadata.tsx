import { FunctionComponent } from 'react';
import Head from 'next/head';

interface MetadataProps {
  title?: string;
  imageSrc?: string;
  description?: string;
}

const DEFAULT_DESCRIPTION = `เช็คประวัติผู้สมัครผู้ว่าฯ กทม. และ ส.ก. เบอร์ นโยบาย และวิสัยทัศน์ กับการตอบคำถามว่าทำไม คนกรุงเทพฯ ต้องเลือกคุณเป็นผู้ว่าฯ กทม.`;

const Metadata: FunctionComponent<MetadataProps> = ({
  title,
  imageSrc,
  description = DEFAULT_DESCRIPTION,
}) => {
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
