import React from 'react';
import Tag from '@/components/Tag';
import { fetchTags } from '@/lib/data';
import { ITag } from '@/interfaces';

export default async function TagsPage() {
	const tags: ITag[] = await fetchTags();

	return (
		<div className='z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex '>
			<div>
				<div className='border-b border-gray-200'>
					<div className='space-y-2 pb-8 pt-6 md:space-y-5'>
						<h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
							Tags
						</h1>
					</div>
				</div>

				<div className='flex flex-wrap pt-6'>
					{tags.map((tag, index) => (
						<>
							<Tag
								key={tag.id}
								type={'preview'}
								text={tag.name}
								slug={tag.urlSlug}
							/>
							{index !== tags.length - 1 && <p className='text-2xl me-3'>|</p>}
						</>
					))}
				</div>
			</div>
		</div>
	);
}
