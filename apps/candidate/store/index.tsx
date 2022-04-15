import {
  createContext,
  Dispatch,
  ReactElement,
  useContext,
  useReducer,
} from 'react';
import {
  ActionEnum,
  ICandidate,
  IDistrict,
  IQuestionCategory,
  ICouncil,
  IQA,
} from '../types/business';
interface IStore {
  candidateList: ICandidate[];
  // questionCategory: IQuestionCategory;
  districtList: IDistrict[];
  councilList: ICouncil[];
  qaList: IQA[];
}

interface PropType {
  children: ReactElement;
}
interface StoreAction {
  type: ActionEnum;
  payload: any;
}
interface IAppContext {
  store: IStore;
  storeDispatch: Dispatch<StoreAction>;
}

const initialQAList: IQA[] = [
  {
    id: 1,
    governor: 'ชัชชาติ สิทธิพันฒ์',
    question: 'ทำไมต้องเลือกคุณเป็นผู้ว่าฯ กทม.',
    answer: 'ผมจะทำให้กทม.xxxxxxxx',
    url: 'https://peachpharm.files.wordpress.com/2013/06/mac-4.jpg',
  },
  {
    id: 2,
    governor: 'ชัชชาติ สิทธิพันฒ์',
    question: 'ทำไมต้องเลือกคุณเป็นผู้ว่าฯ กทม.',
    answer: 'ผมจะทำให้กทม.xxxxxxxx',
    url: 'https://peachpharm.files.wordpress.com/2013/06/mac-4.jpg',
  },
  {
    id: 3,
    governor: 'ชัชชาติ สิทธิพันฒ์',
    question: 'ทำไมต้องเลือกคุณเป็นผู้ว่าฯ กทม.',
    answer: 'ผมจะทำให้กทม.xxxxxxxx',
    url: 'https://peachpharm.files.wordpress.com/2013/06/mac-4.jpg',
  },
  {
    id: 4,
    governor: 'ชัชชาติ สิทธิพันฒ์',
    question: 'ทำไมต้องเลือกคุณเป็นผู้ว่าฯ กทม.',
    answer: 'ผมจะทำให้กทม.xxxxxxxx',
    url: 'https://peachpharm.files.wordpress.com/2013/06/mac-4.jpg',
  },
];

const inititalCouncilList: ICouncil[] = [
  {
    name: 'ชาติดี มีชัย',
    number: 1,
    district: 'คลองเตย',
    party: 'ประชาธิปัติย์',
    age: 20,
    sex: 'ชาย',
    education: 'ปริญญาตรี',
    career: 'ธุรกิจส่วนตัว',
  },
  {
    name: 'ชาติดี มีชัย',
    number: 2,
    district: 'คลองเตย',
    party: 'ประชาธิปัติย์',
    age: 20,
    sex: 'ชาย',
    education: 'ปริญญาตรี',
    career: 'ธุรกิจส่วนตัว',
  },
  {
    name: 'ชาติดี มีชัย',
    number: 3,
    district: 'คลองเตย',
    party: 'ประชาธิปัติย์',
    age: 20,
    sex: 'ชาย',
    education: 'ปริญญาตรี',
    career: 'ธุรกิจส่วนตัว',
  },
  {
    name: 'ชาติดี มีชัย',
    number: 3,
    district: 'คลองเตย',
    party: 'ประชาธิปัติย์',
    age: 20,
    sex: 'ชาย',
    education: 'ปริญญาตรี',
    career: 'ธุรกิจส่วนตัว',
  },
  {
    name: 'ชาติดี มีชัย',
    number: 3,
    district: 'คลองเตย',
    party: 'ประชาธิปัติย์',
    age: 20,
    sex: 'ชาย',
    education: 'ปริญญาตรี',
    career: 'ธุรกิจส่วนตัว',
  },
  {
    name: 'ชาติดี มีชัย',
    number: 3,
    district: 'คลองเตย',
    party: 'ประชาธิปัติย์',
    age: 20,
    sex: 'ชาย',
    education: 'ปริญญาตรี',
    career: 'ธุรกิจส่วนตัว',
  },
  {
    name: 'ชาติดี มีชัย',
    number: 3,
    district: 'คลองเตย',
    party: 'ประชาธิปัติย์',
    age: 20,
    sex: 'ชาย',
    education: 'ปริญญาตรี',
    career: 'ธุรกิจส่วนตัว',
  },
  {
    name: 'ชาติดี มีชัย',
    number: 3,
    district: 'คลองเตย',
    party: 'ประชาธิปัติย์',
    age: 20,
    sex: 'ชาย',
    education: 'ปริญญาตรี',
    career: 'ธุรกิจส่วนตัว',
  },
  {
    name: 'ชาติดี มีชัย',
    number: 3,
    district: 'คลองเตย',
    party: 'ประชาธิปัติย์',
    age: 20,
    sex: 'ชาย',
    education: 'ปริญญาตรี',
    career: 'ธุรกิจส่วนตัว',
  },
  {
    name: 'ชาติดี มีชัย',
    number: 3,
    district: 'คลองเตย',
    party: 'ประชาธิปัติย์',
    age: 20,
    sex: 'ชาย',
    education: 'ปริญญาตรี',
    career: 'ธุรกิจส่วนตัว',
  },
  {
    name: 'ชาติดี มีชัย',
    number: 3,
    district: 'คลองเตย',
    party: 'ประชาธิปัติย์',
    age: 20,
    sex: 'ชาย',
    education: 'ปริญญาตรี',
    career: 'ธุรกิจส่วนตัว',
  },
];

const inititalCandidateList: ICandidate[] = [
  {
    id: 1,
    name: 'ชัชชาติ สิทธิพันธุ์',
    team: 'อิสระ',
    video_url: '',
    image_url: '../../static/images/candidate.png',
    is_highlight: false,
  },
  {
    id: 2,
    name: 'ชัชชาติ สิทธิพันธุ์',
    team: 'อิสระ',
    video_url: '',
    image_url: '../../static/images/candidate.png',
    is_highlight: false,
  },
  {
    id: 3,
    name: 'ชัชชาติ สิทธิพันธุ์',
    team: 'อิสระ',
    video_url: '',
    image_url: '../../static/images/candidate.png',
    is_highlight: false,
  },
  {
    id: 4,
    name: 'ชัชชาติ สิทธิพันธุ์',
    team: 'อิสระ',
    video_url: '',
    image_url: '../../static/images/candidate.png',
    is_highlight: false,
  },
  {
    id: 5,
    name: 'ชัชชาติ สิทธิพันธุ์',
    team: 'อิสระ',
    video_url: '',
    image_url: '../../static/images/candidate.png',
    is_highlight: false,
  },
  {
    id: 6,
    name: 'ชัชชาติ สิทธิพันธุ์',
    team: 'อิสระ',
    video_url: '',
    image_url: '../../static/images/candidate.png',
    is_highlight: false,
  },
];

// const inititalQuestionCategory: IQuestionCategory = {
//   policy: [
//     'สิ่งแรกที่จะได้เห็นหากคุณเป็นผู้ว่าฯ กทม. คืออะไร',
//     'ถ้าเลือกทำนโยบายได้แค่ข้อเดียว จะเลือกทำอะไร เพราะอะไร',
//     'คุณแตกต่างจากผู้ว่าฯกทม. ที่ผ่านมาอย่างไรที่ทำให้นโยบายของคุณประสบความสำเร็จ',
//     'เป็นไปได้ไหมว่าวันหนึ่งกรุงเทพรถจะไม่ติด',
//     'คุณจะแก้ปัญหาน้ำท่วมกรุงเทพฯ อย่างไร',
//     'บทบาทของผู้ว่าฯ กทม.ต่อภัยคุกคามรูปแบบใหม่ เช่น ก่อการร้าย ก่อวินาศกรรม และความมั่นคงทางไซเบอร์ ควรทำอย่างไร',
//     'ผู้ว่าฯ กทม. ทำอะไรได้บ้างกับปัญหา PM2.5',
//   ],
//   opinion: [
//     'คิดอย่างไรกับการรัฐประหาร',
//     'ประเมินการทำงานของรัฐบาล พล.อ.ประยุทธ์ในรอบ 7 ปีที่ผ่านมาอย่างไร',
//     'อะไรคือจุดแข็งของกรุงเทพ',
//     'ถ้าเปลี่ยนกรุงเทพฯ ได้ จำเป็นต้องเปลี่ยนการเมืองใหญ่อะไรก่อนเป็นสิ่งแรก',
//     'ปัญหาใหญ่ที่สุดของกรุงเทพมหานครคืออะไร',
//     'คุณจะพูดกับประชาชนที่รู้สึกหมดหวังกับพื้นที่แห่งนี้อย่างไรให้เชื่อว่าคุณสามารถทำให้กรุงเทพยังมีโอกาสเเละความหวังสำหรับทุกคน',
//     'คิดอย่างไรกับปัญหา Generation Gap',
//   ],
//   lifestyle: [
//     'เวลาเครียดหรือเจอวิกฤต ทำอย่างไรให้ผ่านช่วงนั้นไปได้',
//     'คุณคิดอย่างไรกับคำว่า Work-Life Balance',
//     'หนังสือในดวงใจที่อยากแนะนำให้คนอื่นอ่าน',
//     'คุณขับรถยนต์ยี่ห้ออะไร ทำไมถึงเลือกคันนี้',
//     'ใครคือฮีโร่ในชีวิตของคุณ',
//     'ถ้าต้องเลือกเป็นซุปเปอร์ฮีโร่ได้ 1 ตัว อยากเป็นอะไร เพราะอะไร',
//   ],
// };

const inititalDistrictList: IDistrict[] = [
  {
    display: 'คลองเตย',
    value: 'คลองเตย',
  },
  {
    display: 'คลองเตย',
    value: 'คลองเตย',
  },
  {
    display: 'คลองเตย',
    value: 'คลองเตย',
  },
  {
    display: 'คลองเตย',
    value: 'คลองเตย',
  },
  {
    display: 'คลองเตย',
    value: 'คลองเตย',
  },
  {
    display: 'คลองเตย',
    value: 'คลองเตย',
  },
];

const initialStore: IStore = {
  candidateList: inititalCandidateList,
  // questionCategory: inititalQuestionCategory,
  districtList: inititalDistrictList,
  councilList: inititalCouncilList,
  qaList: initialQAList,
};

export const AppContext = createContext({} as IAppContext);

function storeReducer(state: IStore, action: StoreAction) {
  switch (action.type) {
    case ActionEnum.FETCH_CANDIDATE:
      // TODO: fetch data
      // TODO: format data
      return state;
    default:
      return state;
  }
}

export function AppWrapper({ children }: PropType) {
  let sharedState = '';
  const [store, storeDispatch] = useReducer(storeReducer, initialStore);

  return (
    <AppContext.Provider value={{ store, storeDispatch }}>
      {children}
    </AppContext.Provider>
  );
}
