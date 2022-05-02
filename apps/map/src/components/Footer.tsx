import React, { FunctionComponent, useContext, useState } from 'react';
import Modal from './Modal';
import partners from 'ui/src/data/partners.json';
import { presetContext } from '../contexts/preset';
import { ElectionDataType } from '../models/election';

const Footer: FunctionComponent = () => {
	const preset = useContext(presetContext);
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);

	return (
		<div className="bg-black text-white px-6 lg:px-12">
			<div class="flex flex-row justify-end border-t border-gray py-6">
				{preset?.electionData.type === ElectionDataType.Live && (
					<div className="flex-1 flex flex-row typo-u4 space-x-8">
						{preset?.electionData.total.progress !== undefined && (
							<div className="flex flex-col space-y-1">
								<div>นับคะแนนแล้ว {preset?.electionData.total.progress}%</div>
								<div className="h-2 w-full md:w-64 bg-white bg-opacity-20">
									<div
										className="bg-white h-full"
										style={{ width: `${preset?.electionData.total.progress}%` }}
									></div>
								</div>
							</div>
						)}
						{preset?.electionData.lastUpdatedAt && (
							<div>
								<p>อัปเดตล่าสุด</p>
								<p>
									{new Date(preset?.electionData.lastUpdatedAt).toLocaleString('th-TH', {
										dateStyle: 'medium',
										timeStyle: 'medium'
									})}
								</p>
							</div>
						)}
					</div>
				)}

				<button className="md:hidden" onClick={() => setIsShareModalOpen(true)}>
					<svg width="29" height="28" viewBox="0 0 29 28" fill="none">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M14.5 0C10.787 0 7.226 1.475 4.60049 4.10051C1.97499 6.72602 0.5 10.287 0.5 14C0.5 17.713 1.97499 21.274 4.60049 23.8995C7.226 26.525 10.787 28 14.5 28C18.213 28 21.774 26.525 24.3995 23.8995C27.025 21.274 28.5 17.713 28.5 14C28.5 10.287 27.025 6.72602 24.3995 4.10051C21.774 1.475 18.213 0 14.5 0ZM12.73 14C12.7254 14.2675 12.685 14.5332 12.61 14.79L15.2 16.45C15.7647 15.9884 16.4706 15.7343 17.2 15.73C18.046 15.73 18.8574 16.0661 19.4557 16.6643C20.0539 17.2626 20.39 18.074 20.39 18.92C20.39 19.766 20.0539 20.5774 19.4557 21.1757C18.8574 21.7739 18.046 22.11 17.2 22.11C16.3557 22.1074 15.5469 21.7701 14.9508 21.1721C14.3547 20.5742 14.02 19.7643 14.02 18.92C14.0201 18.6529 14.0571 18.387 14.13 18.13L11.54 16.46C10.9777 16.926 10.2703 17.1807 9.54001 17.18C8.6957 17.18 7.8858 16.8453 7.28784 16.2492C6.68989 15.6531 6.35265 14.8443 6.35001 14C6.35001 13.154 6.68609 12.3426 7.28433 11.7443C7.88257 11.1461 8.69397 10.81 9.54001 10.81C10.2703 10.8093 10.9777 11.064 11.54 11.53L14.12 9.86C14.0471 9.60299 14.0101 9.33714 14.01 9.07C14.0126 8.22742 14.3485 7.42011 14.9443 6.82431C15.5401 6.22852 16.3474 5.89264 17.19 5.89C18.0343 5.89 18.8442 6.22471 19.4421 6.82079C20.0401 7.41687 20.3774 8.22569 20.38 9.07C20.38 9.91604 20.0439 10.7274 19.4457 11.3257C18.8474 11.9239 18.036 12.26 17.19 12.26C16.4598 12.2607 15.7523 12.006 15.19 11.54L12.6 13.21C12.6797 13.4661 12.7234 13.7319 12.73 14Z"
							fill="white"
						/>
					</svg>
				</button>

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

			{isShareModalOpen && (
				<Modal title="Share" onClose={() => setIsShareModalOpen(false)}>
					<div className="flex justify-center py-4">
						<ui-sharer hide-label />
					</div>
				</Modal>
			)}
		</div>
	);
};

export default Footer;
