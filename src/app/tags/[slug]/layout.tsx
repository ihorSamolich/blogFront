import { IPost, ITag } from '@/interfaces';
import { fetchPostBySlug, fetchTagBySlug } from '@/lib/data';
import React from 'react';

export const generateMetadata = async ({
	params,
}: {
	params: { slug: string };
}) => {
	const tag: ITag = await fetchTagBySlug(params.slug);

	return {
		title: `${tag.name} | MY WEB BLOG`,
	};
};

export default function TagSlugLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
