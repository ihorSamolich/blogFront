import { Metadata } from 'next';
import React from 'react';
import { IPost } from '@/interfaces';
import { fetchPostBySlug } from '@/lib/data';

export const generateMetadata = async ({
	params,
}: {
	params: { slug: string };
}) => {
	const post: IPost = await fetchPostBySlug(params.slug);

	return {
		title: `${post.title} | MY WEB BLOG`,
		description: post.meta,
	};
};

export default function BlogSlugLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
