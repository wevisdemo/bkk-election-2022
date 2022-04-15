import { GetStaticPaths, GetStaticProps } from 'next/types';
import { HighLightCandidatePage } from '../components/subPage/highlightCandidatePage';
import { CandidatePage } from '../components/subPage/candidatePage';
import { IGovernor } from '../types/business';
import { useRouter } from 'next/router';
import { fetchTheStandardElectionPosts, Post } from 'wordpress-api';
import { useEffect, useState } from 'react';
import { getNocoApi } from '../utils/nocoHandler';
import Metadata from '../components/metadata';

interface PropsType {
  candidate: IGovernor;
  isComingSoon: boolean;
}

export default function Governor({ candidate, isComingSoon }: PropsType) {
  const router = useRouter();
  const [news, setNews] = useState<Post[]>([]);
  const [pageUrl, setPageUrl] = useState<string>('');
  const is_highlight = candidate.highlight || false;

  useEffect(() => {
    const getPort = async () => {
      try {
        const res = await fetchTheStandardElectionPosts({
          tag: candidate.name || '',
        });
        setNews(res);
      } catch (error: any) {}
    };
    getPort();
    setPageUrl(window.location.href);
  }, []);

  return (
    <div>
      <Metadata title={candidate.name || 'ข้อมูลผู้สมัคร'} />

      {is_highlight ? (
        <HighLightCandidatePage
          isComingSoon={isComingSoon}
          governor={candidate}
          newsList={news}
          pageUrl={pageUrl}
        />
      ) : (
        <CandidatePage
          isComingSoon={isComingSoon}
          governor={candidate}
          newsList={news}
          pageUrl={pageUrl}
        />
      )}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const [res, errMsg] = await getNocoApi('governors');
  if (!errMsg) {
  }
  const data = res.data as IGovernor[];

  const paths = data.map((gov) => {
    return {
      params: { id: gov.id?.toString() || '' },
    };
  });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PropsType> = async (context) => {
  const isComingSoon = process.env.COMING_SOON === 'true' ? true : false;
  const id = context.params?.id;
  const [res, errMsg] = await getNocoApi(`governors/${id}`);
  if (errMsg) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    };
  }
  return { props: { candidate: res.data as IGovernor, isComingSoon } };
};
