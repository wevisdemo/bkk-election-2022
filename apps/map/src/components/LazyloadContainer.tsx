import React, { FunctionComponent, Suspense } from 'react';

const LazyloadContainer: FunctionComponent = ({ children }) => (
	<Suspense
		fallback={
			<div class="w-full h-full flex items-center justify-center">
				<div className="scale-50">
					<div className="loader-spinner" />
				</div>
			</div>
		}
	>
		{children}
	</Suspense>
);

export default LazyloadContainer;
