import { CandidateMap } from "../src/models/candidate";

export function fillGovernorColorAndImage(map: CandidateMap): void {
  for (let [id, candidate] of Object.entries(map)) {
    candidate.color = getColorForGovernor(id);
    candidate.image = `/map/images/65-governor-candidates/${candidate.number}.png`;
  }
}

function getColorForGovernor(no: string): string {
  const color = GovernorPredefinedColors[no];
  if (color) {
    return color;
  }
  return '#666666';
}

export function fillCouncilMemberColor(map: CandidateMap): void {
  for (let [id, candidate] of Object.entries(map)) {
    candidate.color = getColorForCouncilMember(candidate.party);
  }
}

function getColorForCouncilMember(partyName?: string): string {
  if (!partyName) {
    return '#666666';
  }

  const color = PartyColors[partyName];
  if (color) {
    return color;
  }
  return '#666666';
}

const PartyColors: {[number: string]: string} = {
  'พรรคก้าวไกล': '#CA5300',
  'พรรคประชาธิปัตย์': '#1B80B6',
  'พรรคพลังประชารัฐ': '#1B2F60',
  'พรรคเพื่อไทย': '#970F17',
  'พรรคไทยสร้างไทย': '#0022FF',
  'อิสระ(กลุ่มรักษ์กรุงเทพ)': '#FAEDA9',
  'พรรครวมไทยยูไนเต็ด': '#EEBDFF',
  'พรรคกล้า': '#FFCB13',
  'พรรคภูมิใจไทย': '#054523',
};

const GovernorPredefinedColors: {[number: string]: string} = {
  '1': PartyColors['พรรคก้าวไกล'],
  '3': '#336060',
  '4': PartyColors['พรรคประชาธิปัตย์'],
  '6': PartyColors['อิสระ(กลุ่มรักษ์กรุงเทพ)'],
  '7': '#543F2D',
  '8': '#97FF1F',
  '11': '#0022FF',
}