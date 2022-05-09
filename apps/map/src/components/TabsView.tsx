import React, { FunctionComponent, useState } from 'react';

interface Tab {
	name: string;
	component: JSX.Element;
}

interface TabsViewProps {
	tabs: Tab[];
	className?: string;
}

const TabsView: FunctionComponent<TabsViewProps> = ({ tabs, className = '' }) => {
	const [activeTabIndex, setActiceTabIndex] = useState<number>(0);

	return (
		<div className={`flex flex-col ${className} overflow-hidden`}>
			<div className="flex flex-row">
				{tabs.map(({ name }, index) => (
					<button
						key={index}
						class={`flex-1 text-white p-1 typo-u4 border-white ${
							activeTabIndex === index ? 'border-b-4 font-bold' : 'border-b'
						}`}
						onClick={() => setActiceTabIndex(index)}
					>
						{name}
					</button>
				))}
			</div>
			<div className="flex flex-col flex-1 mt-4 overflow-hidden">{tabs[activeTabIndex].component}</div>
		</div>
	);
};

export default TabsView;
