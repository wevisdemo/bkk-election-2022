export interface ICandidate {
  id: number;
  name: string;
  team: string;
  image_url: string;
  video_url: string;
  is_highlight: boolean;
}

export enum ActionEnum {
  FETCH_CANDIDATE = 'FETCH_CANDIDATE',
}

export interface IQuestionCategory {
  policy: string[];
  opinion: string[];
  lifestyle: string[];
}
