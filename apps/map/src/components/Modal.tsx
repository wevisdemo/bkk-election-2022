import React, { FunctionComponent } from 'react';

interface ModalProps {
	title: string;
	onClose: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({ title, onClose, children }) => {
	return (
		<div
			className="fixed inset-0 flex bg-black bg-opacity-50 p-4 justify-center items-center z-50"
			onClick={onClose}
		>
			<div
				className="bg-black border-white border rounded-lg w-full max-w-xs py-6 px-8"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex flex-row mb-8">
					<h5 className="typo-h5 flex-1">{title}</h5>
					<button onClick={onClose}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M4 4L20 20" stroke="white" stroke-width="2" />
							<path d="M4 20L20 4" stroke="white" stroke-width="2" />
						</svg>
					</button>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
