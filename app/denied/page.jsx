import React from 'react';
import Link from 'next/link';
const Denied = () => {
	return (
		<div>
			<h1>You have been denied!</h1>
			<Link href={'/'} className="btn">
				Go Back Home
			</Link>
		</div>
	);
};

export default Denied;
