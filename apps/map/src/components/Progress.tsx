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
			{progressItems.map((pi: ProgressItem) => (
				<span
					class={`h-full ${className}`}
					style={{
						width: `${pi.percent * 100}%`,
						backgroundColor: pi.color,
						border: border
					}}
				>
					{pi.strip && (
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
