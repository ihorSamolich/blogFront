import React from 'react';
import Link from 'next/link';

interface IPostLatest {
	position: number;
	slug: string;
	title: string;
}

const PostLatest = ({ position, slug, title }: IPostLatest) => {
	return (
		<Link
			href={`/blog/${slug}`}
			className={`${position % 2 === 0 ? `text-red-500` : `text-blue-500`} underline mr-3 text-sm font-medium`}
		>
			{title}
		</Link>
	);
};

export default PostLatest;
