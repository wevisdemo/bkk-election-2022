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
  policy: string[];
  opinion: string[];
  lifestyle: string[];
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

export interface IQuestion {
  id: number;
  type: string; // TODO: change to enum
  special_for_governor: string;
  number: number;
  question: string;
  description: string;
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
}
