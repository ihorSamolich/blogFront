import Link from 'next/link';
import React from 'react';
interface ICategoryProps {
	slug: string;
	text: string;
}

const Category = ({ slug, text }: ICategoryProps) => {
	return (
		<Link
			href={`/category/${slug}`}
			className='text-blue-700 mr-3 text-sm font-medium uppercase underline'
		>
			{text}
		</Link>
	);
};

export default Category;
