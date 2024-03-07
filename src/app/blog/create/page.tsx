import React from 'react';
import { fetchCategories, fetchTags } from '@/lib/data';
import { ICategory, ITag } from '@/interfaces';
import CreatePostForm from '@/components/CreatePostForm';

export default async function CreatePostPage() {
	const categories: ICategory[] = await fetchCategories();
	const tags: ITag[] = await fetchTags();

	return (
		<div className='w-full flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Create new post
				</h2>
			</div>

			<div className='w-full max-w-screen-xl mx-auto my-10 px-10 md:px-40'>
				<CreatePostForm categories={categories} tags={tags} />
			</div>
		</div>
	);
}
