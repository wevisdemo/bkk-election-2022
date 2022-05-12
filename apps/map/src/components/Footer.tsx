import React, { FunctionComponent, useContext, useState } from 'react';
import Modal from './Modal';
import partners from 'ui/src/data/partners.json';
import { presetContext } from '../contexts/preset';
import { ElectionDataType } from '../models/election';

const Footer: FunctionComponent = () => {
	const preset = useContext(presetContext);
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);

	return (
		<div className="bg-black text-white px-4 lg:px-12 fixed bottom-0 left-0 right-0 z-10 md:relative">
			<div class="flex flex-row justify-end border-t border-gray py-3 md:py-6">
				{preset?.electionData.type === ElectionDataType.Live && (
					<div className="flex-1 flex flex-row typo-u4 space-x-4 lg:space-x-8">
						{preset?.electionData.total.progress !== undefined && (
							<div className="flex flex-row lg:flex-col space-y-1">
								<div>นับคะแนนโดย<br className='lg:hidden'/>อาสาสมัครแล้ว {preset?.electionData.total.progress.toFixed(1)}%</div>
								<div className="lg:h-2 lg:w-full md:w-64 bg-white bg-opacity-30 w-2 h-7 order-first lg:order-none relative mr-2">
									<div className="absolute bg-white w-full bottom-0 lg:hidden" style={{height: `${preset?.electionData.total.progress}%`}}>
										{preset.electionData.type === ElectionDataType.Live && (
											<div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(/map/images/strip-black.gif)` }}/>
										)}
									</div>
									<div className="absolute bg-white h-full left-0 hidden lg:block" style={{ width: `${preset?.electionData.total.progress}%` }}>
										{preset.electionData.type === ElectionDataType.Live && (
											<div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(/map/images/strip-black.gif)` }} />
										)}
									</div>
								</div>
							</div>
						)}
						{preset?.electionData.lastUpdatedAt && (
							<div>
								<p>อัปเดตล่าสุด</p>
								<p>
									{new Date(preset?.electionData.lastUpdatedAt).toLocaleString('th-TH', {
										dateStyle: 'short',
										timeStyle: 'short'
									})}
								</p>
							</div>
						)}
						<div className='hidden lg:block'>
							<p>Powered by</p>
							<p>
								<a href="https://vive.co.th/#" target="_blank" className='underline'>Vive Digital</a>
							</p>
						</div>
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

				<button className="md:hidden ml-2" onClick={() => alert('TODO: about')}>
					<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_2108_50683)">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M4.10049 4.10051C6.726 1.475 10.287 0 14 0C17.713 0 21.274 1.475 23.8995 4.10051C26.525 6.72602 28 10.287 28 14C28 17.713 26.525 21.274 23.8995 23.8995C21.274 26.525 17.713 28 14 28C10.287 28 6.726 26.525 4.10049 23.8995C1.47499 21.274 0 17.713 0 14C0 10.287 1.47499 6.72602 4.10049 4.10051ZM14.68 16.5H12.3V13.38C14.42 13.28 15.58 12.58 15.58 11.04V10.76C15.58 9.62 14.82 8.96 13.7 8.96C12.5 8.96 11.72 9.78 11.46 10.88L9.34 10.02C9.82 8.38 11.14 6.8 13.8 6.8C16.48 6.8 18.24 8.42 18.24 10.8C18.24 13.16 16.52 14.52 14.68 14.82V16.5ZM15.12 19.84C15.12 20.64 14.64 21.24 13.52 21.24C12.4 21.24 11.92 20.64 11.92 19.84V19.44C11.92 18.62 12.4 18.04 13.52 18.04C14.64 18.04 15.12 18.62 15.12 19.44V19.84Z" fill="white" />
						</g>
						<defs>
							<clipPath id="clip0_2108_50683">
								<rect width="28" height="28" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</button>

				<div className="hidden md:flex flex-row space-x-12">
					<ui-sharer />
					<div className="flex flex-row space-x-6">
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
