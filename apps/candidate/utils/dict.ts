export const QuestionTypeDict = {
  policy: 'ด้านนโยบาย',
  opiniion: 'ด้านวิศัยทัศน์',
  lifestyle: 'ด้าน Lifestyle',
  special: 'ด้านเคลียใจ',
};

export const getCandidateOG = (id: number): string => {
  try {
    const img = require(`../static/images/og/candidates_${id}.png`);
    return img.src as string;
  } catch {
    return '';
  }
};
