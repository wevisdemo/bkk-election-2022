interface SortableListHeaderProps {
	headerText: string;
  isActive: boolean;
  sClass: string;
  headerOnClick: () => void;
	children?: React.ReactNode;
}

const ARROW_DOWN = '↓';

export default function SortableListHeader({ headerText, sClass, isActive, headerOnClick, children }: SortableListHeaderProps) {
	return (
		<span class={`opacity-50 ${sClass} items-center gap-1`} onClick={headerOnClick}>
			{headerText}{isActive && ARROW_DOWN}
			{children}
		</span>
	);
}
