import React from 'react';
import { IPost } from '@/interfaces';
import Link from 'next/link';
import Tag from '@/components/Tag';
import { formatDate } from '@/utils/formatDate';

interface IPostPreview {
	post: IPost;
}

const PostPreview = ({ post }: IPostPreview) => {
	return (
		<li key={post.urlSlug} className='py-12'>
			<article>
				<div className='space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'>
					<dl className='pe-4'>
						<dt className='sr-only'>Published on</dt>
						<dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
							<time>{formatDate(post.postedOn)}</time>
						</dd>
					</dl>
					<div className='space-y-5 xl:col-span-3'>
						<div className='space-y-6'>
							<div>
								<h2 className='text-2xl font-bold leading-8 tracking-tight'>
									<Link
										href={`/blog/${post.urlSlug}`}
										className='text-gray-900 dark:text-gray-100'
									>
										{post.title}
									</Link>
								</h2>
								<div className='flex flex-wrap'>
									<p className='font-bold underline text-blue-700 me-3'>
										#tags:{' '}
									</p>
									{post.tags.map(tag => (
										<Tag key={tag.id} text={tag.name} slug={tag.urlSlug} />
									))}
								</div>
							</div>
							<div className='prose max-w-none text-gray-500 dark:text-gray-400'>
								{post.shortDescription}
							</div>
						</div>
						<div className='text-base font-medium leading-6'>
							<Link
								href={`/blog/${post.urlSlug}`}
								className='text-blue-500 hover:text-blue-700'
								aria-label={`Read more: "${post.title}"`}
							>
								Read more &rarr;
							</Link>
						</div>
					</div>
				</div>
			</article>
		</li>
	);
};

export default PostPreview;
