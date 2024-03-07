import React from 'react';
import PostPreview from '@/components/PostPreview';
import { ICategory, IPost, ITag } from '@/interfaces';
import { fetchCategories, fetchPosts, fetchTags } from '@/lib/data';
import Category from '@/components/Category';
import Tag from '@/components/Tag';
import PostLatest from '@/components/PostLatest';

export default async function BlogPage() {
	const posts: IPost[] = await fetchPosts();
	const categories: ICategory[] = await fetchCategories();
	const tags: ITag[] = await fetchTags();

	return (
		<div className='z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex '>
			<div className='divide-y divide-gray-200'>
				<div className='space-y-2 pb-8 pt-6 md:space-y-5'>
					<h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
						Blog
					</h1>
				</div>

				<div className='flex-col md:grid grid-cols-8 gap-4 relative'>
					<div className='px-8 col-span-2 bg-gray-50 py-12 border-b border-x rounded-b-xl border-gray-200'>
						<div className='flex md:flex-col flex-wrap'>
							<p className='font-bold text-xl text-black me-3'>Categories:</p>
							{categories.map(category => (
								<Category
									key={category.id}
									text={category.name}
									slug={category.urlSlug}
								/>
							))}
						</div>
						<div className='flex md:flex-col flex-wrap'>
							<p className='font-bold text-xl text-black me-3'>Tags:</p>
							{tags.map(tag => (
								<Tag key={tag.id} text={tag.name} slug={tag.urlSlug} />
							))}
						</div>

						<div className='flex md:flex-col flex-wrap'>
							<p className='font-bold text-xl text-black me-3'>Latest posts:</p>
							{posts.slice(0, 5).map((post, index) => (
								<PostLatest
									key={post.id}
									position={index}
									slug={post.urlSlug}
									title={post.title}
								/>
							))}
						</div>
					</div>

					<div className='col-span-6'>
						<ul>
							{posts.map(post => (
								<PostPreview key={post.id} post={post} />
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
