import { Candidate, CandidateMap } from '../../models/candidate';
import { District, Result } from '../../models/election';

export type Vector2D = {
  x: number;
  y: number;
}

export type Table2D = {
  row: number;
  col: number;
}

export const getDistrictCoordinate = (districtName: string): Table2D => {
  switch (districtName) {
    case "บางพลัด": return { row: 2, col: 2 };
    case "ห้วยขวาง": return { row: 2, col: 7 };
    case "วังทองหลาง": return { row: 2, col: 8 };
    case "ทวีวัฒนา": return { row: 3, col: 0 };
    case "ลาดกระบัง": return { row: 3, col: 11 };
    case "ดินแดง": return { row: 2, col: 6 };
    case "ตลิ่งชัน": return { row: 3, col: 1 };
    case "ดุสิต": return { row: 2, col: 4 };
    case "สะพานสูง": return { row: 3, col: 10 };
    case "พญาไท": return { row: 1, col: 5 };
    case "บางกอกน้อย": return { row: 3, col: 2 };
    case "ราชเทวี": return { row: 2, col: 5 };
    case "พระนคร": return { row: 3, col: 4 };
    case "ป้อมปราบศัตรูพ่าย": return { row: 3, col: 5 };
    case "ป้อมปราบฯ": return { row: 3, col: 5 };
    case "ปทุมวัน": return { row: 3, col: 7 };
    case "บางแค": return { row: 4, col: 0 };
    case "สวนหลวง": return { row: 4, col: 10 };
    case "วัฒนา": return { row: 3, col: 8 };
    case "บางกอกใหญ่": return { row: 4, col: 2 };
    case "ภาษีเจริญ": return { row: 4, col: 1 };
    case "สัมพันธวงศ์": return { row: 3, col: 6 };
    case "คลองเตย": return { row: 4, col: 8 };
    case "ธนบุรี": return { row: 5, col: 2 };
    case "คลองสาน": return { row: 5, col: 3 };
    case "ประเวศ": return { row: 5, col: 10 };
    case "บางรัก": return { row: 4, col: 5 };
    case "หนองแขม": return { row: 5, col: 0 };
    case "สาทร": return { row: 4, col: 6 };
    case "ยานนาวา": return { row: 4, col: 7 };
    case "จอมทอง": return { row: 5, col: 1 };
    case "บางคอแหลม": return { row: 5, col: 5 };
    case "พระโขนง": return { row: 4, col: 9 };
    case "ราษฎร์บูรณะ": return { row: 6, col: 3 };
    case "บางบอน": return { row: 6, col: 1 };
    case "บางนา": return { row: 5, col: 9 };
    case "บางขุนเทียน": return { row: 7, col: 1 };
    case "ดอนเมือง": return { row: 0, col: 7 };
    case "หนองจอก": return { row: 1, col: 11 };
    case "สายไหม": return { row: 1, col: 9 };
    case "คลองสามวา": return { row: 1, col: 10 };
    case "หลักสี่": return { row: 0, col: 6 };
    case "บางเขน": return { row: 1, col: 8 };
    case "จตุจักร": return { row: 1, col: 6 };
    case "คันนายาว": return { row: 2, col: 10 };
    case "มีนบุรี": return { row: 2, col: 11 };
    case "ลาดพร้าว": return { row: 1, col: 7 };
    case "บางซื่อ": return { row: 0, col: 5 };
    case "บึงกุ่ม": return { row: 2, col: 9 };
    case "บางกะปิ": return { row: 3, col: 9 };
    case "ทุ่งครุ": return { row: 6, col: 2 };
    default: {
      return { row: -1, col: -1 }
    }
  }
}

export interface RectColorWithCandidateRatio {
  percentage: number,
  color: string,
}

export const WORLD_WIDTH = 1450
export const WORLD_HEIGHT = 960;
export const MAX_DISPLAY_RANK = 5;

// MAP_WINNER - POLYGON MAP
export class DistrictMapWinnerData {
  district: District;
  highestScoreResult?: Result;
  highestScoreCandidate?: Candidate;

  constructor(d: District, c: CandidateMap) {
    this.district = d;
    if (this.district) {
      const { voting } = this.district
      const { result } = voting
      this.highestScoreResult = result.reduce((maxResult: Result, res: Result) => maxResult.count > res.count ? maxResult : res)
    }
    if (this.highestScoreResult && c) {
      this.highestScoreCandidate = c[this.highestScoreResult.candidateId];
    }
  }
}

export class DistrictGridWinnerData {
  coordinate: Table2D;
  district: District;
  highestScoreCandidate?: Candidate;
  highestScoreResult?: Result;

  constructor(d: District, c: CandidateMap) {
    this.coordinate = getDistrictCoordinate(d.name)
    this.district = d;
    if (this.district) {
      const { voting } = this.district
      const { result } = voting
      this.highestScoreResult = result.reduce((maxResult: Result, res: Result) => maxResult.count > res.count ? maxResult : res)
    }
    if (this.highestScoreResult && c) {
      this.highestScoreCandidate = c[this.highestScoreResult.candidateId];
    }
  }
}

export class DistrictGridRatioData {
  coordinate: Table2D;
  district: District;
  ratio: number;
  districtCandidateVoteRatio: RectColorWithCandidateRatio[] = [];

  constructor(d: District, c: CandidateMap, r: number, dV: RectColorWithCandidateRatio[]) {
    this.coordinate = getDistrictCoordinate(d.name)
    this.district = d;
    this.ratio = r;
    this.districtCandidateVoteRatio = dV
  }
}