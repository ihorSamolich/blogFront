'use client';

import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ICategory, IPostCreate, ITag } from '@/interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Editor as TinyMCEEditor } from 'tinymce';
import { addPost } from '@/lib/data';
import { handleImageUploadEditor } from '@/utils/handleImageUploadEditor';
import MultiSelect from '@/components/MultiSelect';

const TINY_KEY = process.env.NEXT_PUBLIC_TINY_KEY;
const URL = process.env.NEXT_PUBLIC_BASE_URL;

interface ICreatePostFormProps {
	categories: ICategory[];
	tags: ITag[];
}

const CreatePostForm = ({ categories, tags }: ICreatePostFormProps) => {
	const editorRef = useRef<TinyMCEEditor | null>(null);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IPostCreate>();

	const onSubmit: SubmitHandler<IPostCreate> = async data => {
		if (editorRef.current) {
			data = {
				...data,
				description: editorRef.current?.getContent(),
				tags: selectedTags,
			};
		}

		const res = await addPost(data);
	};

	return (
		<form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label
					htmlFor='title'
					className='block text-sm font-medium leading-6 text-gray-900'
				>
					Title
				</label>
				<div className='mt-2'>
					<input
						id='title'
						{...register('title', { required: true })}
						type='text'
						className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
					/>
				</div>
			</div>

			<div>
				<div className='flex items-center justify-between'>
					<label
						htmlFor='shortDescription'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Short Description
					</label>
				</div>
				<div className='mt-2'>
					<textarea
						id='shortDescription'
						{...register('shortDescription', { required: true })}
						className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
					/>
				</div>
			</div>

			<div>
				<div className='flex items-center justify-between'>
					<label
						htmlFor='description'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Description
					</label>
				</div>

				<Editor
					onInit={(evt, editor) => (editorRef.current = editor)}
					apiKey={TINY_KEY}
					id='description'
					initialValue='<p>Try adding an image with image upload!</p>'
					init={{
						height: 500,
						plugins: [
							'advlist',
							'autolink',
							'lists',
							'link',
							'image',
							'charmap',
							'preview',
							'anchor',
							'searchreplace',
							'visualblocks',
							'code',
							'fullscreen',
							'insertdatetime',
							'media',
							'table',
							'code',
							'help',
							'wordcount',
						],
						toolbar:
							'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
						images_upload_url: `${URL}/api/image`,
						automatic_uploads: true,
						images_reuse_filename: true,
						images_upload_handler: handleImageUploadEditor,
					}}
				/>
			</div>

			<div>
				<div className='flex items-center justify-between'>
					<label
						htmlFor='meta'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Meta
					</label>
				</div>
				<div className='mt-2'>
					<textarea
						id='meta'
						{...register('meta', { required: true })}
						className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
					/>
				</div>
			</div>

			<div>
				<div className='flex items-center justify-between'>
					<label
						htmlFor='categoryId'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Category
					</label>
				</div>
				<div className='mt-2'>
					<select
						id='categoryId'
						{...register('categoryId', { required: true })}
						className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
						defaultValue={-1}
					>
						<option value={-1} disabled>
							Choose a category
						</option>
						{categories.map(category => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>
			</div>

			<div>
				<label className='block text-sm font-medium leading-6 text-gray-900'>
					Tags
				</label>
				<div className='mt-2'>
					<MultiSelect
						tags={tags}
						selectedTags={selectedTags}
						setSelectedTags={setSelectedTags}
					/>
				</div>
			</div>

			<div className='flex justify-center'>
				<button
					type='submit'
					className='rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
				>
					Publish new post
				</button>
			</div>
		</form>
	);
};

export default CreatePostForm;
