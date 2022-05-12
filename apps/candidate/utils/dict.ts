const img = require('../public/images/candidates/1/1.webp');

export const QuestionTypeDict = {
  policy: 'ด้านนโยบาย',
  opiniion: 'ด้านวิศัยทัศน์',
  lifestyle: 'ด้าน Lifestyle',
  special: 'ด้านเคลียใจ',
};

export const getCouncilImage = (districtId: number, councilNumber: number) => {
  try {
    const img = require(`../public/images/candidates/${districtId}/${councilNumber}.webp`);
    return img.default.src as string;
  } catch {
    return '';
  }
};

export const getCandidateOG = (id: number): string => {
  try {
    const img = require(`../static/images/og/candidates_${id}.png`);
    return img.default.src as string;
  } catch {
    return '';
  }
};

export const getQuestionOG = (type: string, id: number): string => {
  try {
    const img = require(`../static/images/og/question/question_${type}_${id}.png`);
    return img.default.src as string;
  } catch {
    return '';
  }
};

export type numberListType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

export const colorDict = {
  1: '#F66C03',
  2: '#D185FF',
  3: '#008989',
  4: '#4BDFFF',
  5: '#6DA7FF',
  6: '#EDDF95',
  7: '#A7764F',
  8: '#82E016',
  9: '#FF408E',
  10: '#39A96A',
  11: '#476FFF',
  12: '#C6A059',
  13: '#588CB1',
  14: '#83A74F',
  15: '#FFF06C',
  16: '#FFA1D7',
  17: '#8E7CFF',
  18: '#9CA3E7',
  19: '#C8595C',
  20: '#FFA37C',
  21: '#B8E7B1',
  22: '#7CFFD8',
  23: '#3C7EFF',
  24: '#CDA682',
  25: '#FF7C7C',
  26: '#1892AD',
  27: '#FFA149',
  28: '#789978',
  29: '#9867C9',
  30: '#BFF27F',
  31: '#FC4145',
};

export const districtOrderList = [
  'พระนคร',
  'ดุสิต',
  'หนองจอก',
  'บางรัก',
  'บางเขน',
  'บางกะปิ',
  'ปทุมวัน',
  'ป้อมปราบศัตรูพ่าย',
  'พระโขนง',
  'มีนบุรี',
  'ลาดกระบัง',
  'ยานนาวา',
  'สัมพันธวงศ์',
  'พญาไท',
  'ธนบุรี',
  'บางกอกใหญ่',
  'ห้วยขวาง',
  'คลองสาน',
  'ตลิ่งชัน',
  'บางกอกน้อย',
  'บางขุนเทียน',
  'ภาษีเจริญ',
  'หนองแขม',
  'ราษฎร์บูรณะ',
  'บางพลัด',
  'ดินแดง',
  'บึงกุ่ม',
  'สาทร',
  'บางซื่อ',
  'จตุจักร',
  'บางคอแหลม',
  'ประเวศ',
  'คลองเตย',
  'สวนหลวง',
  'จอมทอง',
  'ดอนเมือง',
  'ราชเทวี',
  'ลาดพร้าว',
  'วัฒนา',
  'บางแค',
  'หลักสี่',
  'สายไหม',
  'คันนายาว',
  'สะพานสูง',
  'วังทองหลาง',
  'คลองสามวา',
  'บางนา',
  'ทวีวัฒนา',
  'ทุ่งครุ',
  'บางบอน',
];
