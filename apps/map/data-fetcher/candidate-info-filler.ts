import { CandidateMap } from "../src/models/candidate";

const PartyColors = {
  'พรรคก้าวไกล': '#F66C03',
  'พรรคพลังประชารัฐ': '',
  'พรรคเพื่อไทย': '',
  'พรรคประชาธิปัตย์': '#4BDFFF',
};

export function fillGovernorColorAndImage(map: CandidateMap): void {
  for (let [id, candidate] of Object.entries(map)) {
    candidate.color = getColorForGovernor(id);
    candidate.image = `/map/static/images/65-governor-candidates/${candidate.number}.png`;
  }
}

function getColorForGovernor(no: string): string {
  const color = GovernorPredefinedColors[no];
  if (color) {
    return color;
  }
  return '#666666';
}

const GovernorPredefinedColors: {[number: string]: string} = {
  '1': PartyColors.พรรคก้าวไกล,
  '3': '#008989',
  '4': PartyColors.พรรคประชาธิปัตย์,
  '6': '#EDDF95',
  '7': '#95633B',
  '8': '#82E016',
  '11': '#476FFF',
}

export function fillGovernorColor(map: CandidateMap): void {
  for (let [id, candidate] of Object.entries(map)) {
    candidate.color = getColorForCouncilMember(candidate.party);
  }
}

function getColorForCouncilMember(partyName: string): string {
  const color = PartyColors[partyName];
  if (color) {
    return color;
  }
  return '#666666';
}