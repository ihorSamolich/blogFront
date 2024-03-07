import { Metadata } from 'next';
import React from 'react';
import { ICategory, IPost } from '@/interfaces';
import { fetchCategoryBySlug } from '@/lib/data';

export const generateMetadata = async ({
	params,
}: {
	params: { slug: string };
}) => {
	const category: ICategory = await fetchCategoryBySlug(params.slug);

	return {
		title: `${category.name} | MY WEB BLOG`,
		description: category.description,
	};
};

export default function CategorySlugLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className='flex flex-col items-center justify-between'>
			{children}
		</main>
	);
}
