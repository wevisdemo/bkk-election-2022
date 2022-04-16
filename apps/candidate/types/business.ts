export interface ICandidate {
  id: number;
  name: string;
  team: string;
  image_url: string;
  video_url: string;
  is_highlight: boolean;
}

export interface IDistrict {
  display: string;
  value: string;
}

export enum ActionEnum {
  FETCH_CANDIDATE = 'FETCH_CANDIDATE',
}

export interface IQuestionCategory {
  exclusive: IQuestion[];
  policy: IQuestion[];
  opinion: IQuestion[];
  lifestyle: IQuestion[];
}

export interface ICouncil {
  name: string;
  number: number;
  district: string;
  party: string;
  age: number;
  sex: string;
  education: string;
  career: string;
}

export interface IQA {
  id: number;
  governor: string;
  question: string;
  answer: string;
  url: string;
}

export interface IQA2 {
  question_id: number;
  answer_id: number;
  governor: string;
  question: string;
  question_type: string;
  answer: string;
  url: string;
}

interface IQuestionAnswerList {
  id: number;
  nc_xeff__candidates_id: number;
  nc_xeff__questions_id: number;
}
export interface IQuestion {
  id: number;
  type: string; // TODO: change to enum
  number: number;
  question: string;
  description: string;
  nc_xeff__candidates_id: number;
  answersList: IQuestionAnswerList[];
  governorsRead?: {
    id: number;
    name: string;
  };
}

export interface IAnswer {
  id: number;
  nc_xeff__candidates_id: number;
  nc_xeff__questions_id: number;
  text: string;
  url: string;
  governorsRead: {
    id: number;
    name: string;
  };
  questionsRead: {
    id: number;
    question: string;
  };
}

export interface IGovernor {
  id: null | number;
  name: null | string;
  number: null | number;
  sex: null | string;
  birthdate: null | string;
  property: null | string;
  higher_education: null | string;
  career: null | string;
  political_career: null | string;
  party: null | string;
  policy: null | string;
  contact_web: null | string;
  contact_facebook: null | string;
  contact_twitter: null | string;
  profile_pic: null | string;
  cover_pic: null | string;
  nickname: null | string;
  highlight: null | true;
  policy_url: null | string;
  age: null | number;
  basic_education: null | string;
  slogan: null | string;
  contact_youtube: null | string;
  contact_tiktok: null | string;
  other_data: null | string;
  contact_email: null | string;
  contact_instagram: null | string;
  contact_line: null | string;
  answersList: IGovernorAnswer[];
}

interface IGovernorAnswer {
  id: number;
  nc_xeff__candidates_id: number;
}
