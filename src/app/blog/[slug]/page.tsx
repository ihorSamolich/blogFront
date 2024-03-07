import { IPost } from '@/interfaces';
import { fetchPostBySlug } from '@/lib/data';
import React from 'react';
import { formatDate } from '@/utils/formatDate';
import Tag from '@/components/Tag';
import Category from '@/components/Category';

export default async function BlogSlugPage({
	params,
}: {
	params: { slug: string };
}) {
	const post: IPost = await fetchPostBySlug(params.slug);

	return (
		<article className='flex flex-col items-center justify-between p-6'>
			<div className='z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex '>
				<div className='divide-y divide-gray-200'>
					<div className='space-y-2 pb-8 pt-6 md:space-y-5'>
						<h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
							{post.title}
						</h1>
						<p className='text-lg leading-7 text-gray-500 border-b border-gray-200'>
							{post.shortDescription}
						</p>

						<div className='flex justify-between border-b border-gray-200'>
							<dl className='flex gap-3 text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
								<dt className='sr-only'>Published</dt>
								<dd>
									<time>{formatDate(post.postedOn)}</time>
								</dd>
							</dl>

							<dl className='flex gap-3 text-base font-medium leading-6 text-gray-500'>
								<dt>Category:</dt>
								<dd>
									<Category
										key={post.category.id}
										text={post.category.name}
										slug={post.category.urlSlug}
									/>
								</dd>
							</dl>
						</div>

						<div className='flex-col md:grid grid-cols-8 gap-4'>
							<div>
								<div className='flex md:flex-col flex-wrap'>
									<p className='font-bold underline text-blue-700 me-3'>
										Tags:{' '}
									</p>
									{post.tags.map(tag => (
										<Tag key={tag.id} text={tag.name} slug={tag.urlSlug} />
									))}
								</div>
							</div>

							<div
								className='col-span-7 overflow-hidden text-lg leading-7 text-black border-b border-gray-200'
								dangerouslySetInnerHTML={{ __html: post.description }}
							></div>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}
