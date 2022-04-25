import { Post } from 'wordpress-api';

interface PropsType {
  news: Post;
}
export function NewsCard({ news }: PropsType) {
  return (
    <div className="h-[350px] max-w-[360px] border-[3px] border-[#dddddd] rounded-[16px] p-[20px] md:pr-[30px] md:mr-[30px]">
      <ui-post-card
        title={news.title}
        link={news.link}
        date={news.date}
        image={news.image}
      ></ui-post-card>
    </div>
  );
}
