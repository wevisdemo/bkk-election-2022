import { Preset } from '../contexts/preset';
import { CandidateMap } from '../models/candidate';
import { ElectionData, ElectionIndex } from '../models/election';

export async function fetchPreset({
	shortname,
	fullname,
	subtitle,
	descriptionModal,
	electionDataUrl,
	candidateDataUrl
}: ElectionIndex): Promise<Preset> {
	const [electionData, candidateMap] = await Promise.all([
		getJson<ElectionData>(electionDataUrl),
		getJson<CandidateMap>(candidateDataUrl)
	]);

	electionData.districts.forEach(({ voting }) => voting.result.sort((a, z) => z.count - a.count));

	return {
		shortname,
		fullname,
		subtitle,
		electionData,
		descriptionModal,
		candidateMap
	};
}

export async function getJson<T>(url: string): Promise<T> {
	const response = await fetch(url);
	return response.json();
}
