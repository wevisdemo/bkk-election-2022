interface CandidateOverviewListHeaderProps {
	headerText: string;
  isActive: boolean;
  sClass: string;
  headerOnClick: () => void;
}

const ARROW_DOWN = '↓';

export default function CandidateOverviewListHeader({ headerText, sClass, isActive, headerOnClick }: CandidateOverviewListHeaderProps) {
	return (
		<span class={`opacity-50 ${sClass}`} onClick={headerOnClick}>
			{headerText}{isActive && ARROW_DOWN}
		</span>
	);
}
