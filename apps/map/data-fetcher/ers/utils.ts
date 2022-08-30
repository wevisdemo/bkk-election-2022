export function stripDistrictPrefix(districtName: string): string {
  return districtName.startsWith('เขต') ? districtName.split('เขต')[1] : districtName;
}