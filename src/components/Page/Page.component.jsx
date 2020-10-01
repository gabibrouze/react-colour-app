import React from 'react';
import './Page.styles.css';

const Page = ({ children }) => {
	return <section className='page'>{children}</section>;
};

export default Page;
