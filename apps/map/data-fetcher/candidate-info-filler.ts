import { CandidateMap } from "../src/models/candidate";

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
  '1': '#F66C03',
  '3': '#008989',
  '4': '#4BDFFF',
  '6': '#EDDF95',
  '7': '#95633B',
  '8': '#82E016',
  '11': '#476FFF',
}