import React, { FunctionComponent } from 'react';
import partners from 'ui/src/data/partners.json';

const Footer: FunctionComponent = () => {
	return (
		<div className="bg-black text-white px-6 lg:px-12">
			<div class="flex flex-row border-t border-gray py-6">
				<div className="flex-1 typo-u4">นับคะแนนแล้ว 32.4%</div>
				<div className="hidden md:flex flex-row space-x-12">
					<ui-sharer />
					<div className="flex flex-row space-x-8">
						{partners.map(({ name, logo, href }) => (
							<a href={href}>
								<img src={logo} alt={name} className="h-6" />
							</a>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
