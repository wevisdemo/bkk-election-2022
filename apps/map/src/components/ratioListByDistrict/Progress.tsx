interface ProgressProps {
	progressItems: ProgressItem[];
	border?: string;
}

export interface ProgressItem {
	percent: number;
	color: string;
	strip?: boolean;
}

const STRIP_GIF_PATH = '/map/static/images/strip-black.gif';

export default function Progress({ progressItems, border }: ProgressProps) {
	return (
		<div class="inline-flex w-full h-2 my-auto">
			{progressItems.map((pi: ProgressItem) => (
				<span
					class={`h-full`}
					style={{
						width: `${pi.percent*100}%`,
						backgroundColor: pi.color + (pi.strip ? '71' : ''),
						border: border && `1px solid ${border}`
					}}
				>
					{pi.strip && (
						<div
							class="opacity-20 w-full h-full left-0 top-0"
							style={{ backgroundImage: `url('${STRIP_GIF_PATH}')` }}
						/>
					)}
				</span>
			))}
		</div>
	);
}
