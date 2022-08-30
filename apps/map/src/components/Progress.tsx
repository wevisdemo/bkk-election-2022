interface ProgressProps {
	progressItems: ProgressItem[];
	border?: string;
	className: string;
	children?: React.ReactNode;
}

export interface ProgressItem {
	percent: number;
	color: string;
	strip?: boolean;
}

const STRIP_GIF_PATH = '/map/images/strip-black.gif';

export default function Progress({ progressItems, border, className, children }: ProgressProps) {
	return (
		<div class="inline-flex w-full h-full my-auto">
			{progressItems.map((progressItem: ProgressItem, index: number) => (
				<span
					class={`h-full duration-200 ${className}`}
					style={{
						width: `${progressItem.percent * 100}%`,
						backgroundColor: progressItem.color,
						border: border
					}}
				>
					{progressItem.strip && (
						<div
							class="opacity-20 h-full left-0 top-0"
							style={{ backgroundImage: `url('${STRIP_GIF_PATH}')` }}
						/>
					)}
					{children}
				</span>
			))}
		</div>
	);
}
