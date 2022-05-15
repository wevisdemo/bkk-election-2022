import React, { FunctionComponent } from 'react';

interface ModalProps {
	title: string;
	subtitle?: string;
	imageUrl?: string;
	containerClassName: string;
	className: string;
	onClose: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({ title, subtitle, imageUrl, onClose, children, className, containerClassName }) => {
	return (
		<div
			className={`fixed inset-0 flex bg-black bg-opacity-50 p-4 justify-center items-center z-50 ${containerClassName}`}
			onClick={onClose}
		>
			<div
				className={`bg-black border-white border rounded-lg w-full max-w-xs flex flex-col lg:flex-row relative ${className} overflow-hidden`}
				onClick={(e) => e.stopPropagation()}
			>
				<button type="button" onClick={onClose} className="absolute top-[1.5rem] right-[1.5rem] z-20">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M4 4L20 20" stroke="white" stroke-width="2" />
						<path d="M4 20L20 4" stroke="white" stroke-width="2" />
					</svg>
				</button>

				{imageUrl &&
					<div
						className="bg-gray lg:basis-1/3 w-full min-h-[100px] lg:h-full bg-cover bg-center relative grayscale opacity-40"
						style={`background-image: url('${imageUrl}')`}
					>
						<div
							class={`absolute w-full h-1/2 bottom-0 lg:h-full lg:w-1/2 lg:right-0 bg-gradient-to-t lg:bg-gradient-to-l z-10 from-black to-black/0 bottom-0 pointer-events-none`}
						/>
					</div>
				}

				<div className={`overflow-y-auto grow ${imageUrl ? 'pt-0 pb-6 lg:py-6 lg:pl-4' : 'py-6'} px-8 flex flex-col`}>
					<div className="flex flex-col mb-8">
						<h5 className="typo-h5 flex-1">{title}</h5>
						{subtitle && <p className="typo-u4">{subtitle}</p>}
					</div>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
