import { IPost, ITag } from '@/interfaces';
import { fetchPostsByTag, fetchTagBySlug } from '@/lib/data';
import React from 'react';
import PostPreview from '@/components/PostPreview';

export default async function TagSlugPage({
	params,
}: {
	params: { slug: string };
}) {
	const tag: ITag = await fetchTagBySlug(params.slug);
	const posts: IPost[] = await fetchPostsByTag(params.slug);
	return (
		<div className='z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex '>
			<div className='divide-y divide-gray-200'>
				<div className='space-y-2 pb-8 pt-6 md:space-y-5'>
					<h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
						#{tag.name}
					</h1>
					<p className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
						{tag.description}
					</p>
				</div>
				<ul className='divide-y divide-gray-200'>
					{posts.map(post => (
						<PostPreview key={post.id} post={post} />
					))}
				</ul>
			</div>
		</div>
	);
}
