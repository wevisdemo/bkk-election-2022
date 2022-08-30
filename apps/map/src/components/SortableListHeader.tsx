interface SortableListHeaderProps {
	headerText: string;
	isActive: boolean;
	descending: boolean;
	className: string;
	headerOnClick: () => void;
	children?: React.ReactNode;
}

const ARROW_DOWN = '↓';
const ARROW_UP = '↑';

export default function SortableListHeader({
	headerText,
	className,
	isActive,
	descending,
	headerOnClick,
	children
}: SortableListHeaderProps) {
	return (
		<span class={`opacity-50 ${className} items-center gap-1 lg:whitespace-nowrap`} onClick={headerOnClick}>
			{headerText}
			{isActive && (descending ? ARROW_UP : ARROW_DOWN)}
			{children}
		</span>
	);
}
