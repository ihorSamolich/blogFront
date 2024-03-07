'use client';

import React, { useRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import { ITag } from '@/interfaces';

interface IMultiSelectProps {
	tags: ITag[];
	selectedTags: string[];
	setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultiSelect = ({
	tags,
	selectedTags: selected,
	setSelectedTags: setSelected,
}: IMultiSelectProps) => {
	const [query, setQuery] = useState<string>('');
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const filteredTags: string[] = tags
		.filter(
			item =>
				item?.name
					?.toLocaleLowerCase()
					?.includes(query.toLocaleLowerCase().trim()) &&
				!selected.includes(item.name),
		)
		.map(item => item.name);

	const isDisable: boolean =
		!query?.trim() ||
		selected.filter(
			item =>
				item?.toLocaleLowerCase()?.trim() ===
				query?.toLocaleLowerCase()?.trim(),
		)?.length > 0;

	return (
		<div className=' grid '>
			<div className='relative w-full text-sm'>
				{selected?.length ? (
					<div className='bg-white w-full relative text-xs flex flex-wrap gap-1 p-2 mb-2'>
						{selected.map(tag => (
							<div
								key={tag}
								className='rounded-full w-fit py-1.5 px-3 border border-gray-400 bg-gray-50 text-gray-500
                  flex items-center gap-2'
							>
								{tag}
								<div
									onMouseDown={e => e.preventDefault()}
									onClick={() => setSelected(selected.filter(i => i !== tag))}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='w-6 h-6'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M6 18 18 6M6 6l12 12'
										/>
									</svg>
								</div>
							</div>
						))}
						<div className='w-full text-right'>
							<span
								className='text-gray-400 cursor-pointer'
								onClick={() => {
									setSelected([]);
									inputRef.current?.focus();
								}}
							>
								Clear all
							</span>
						</div>
					</div>
				) : null}

				<div className='card flex items-center justify-between  w-full gap-2.5'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
						/>
					</svg>

					<input
						ref={inputRef}
						type='text'
						value={query}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setQuery(e.target.value.trimStart())
						}
						placeholder='Search tags'
						className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
						onFocus={() => setMenuOpen(true)}
						onBlur={() => setMenuOpen(false)}
						onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
							if (e.key === 'Enter' && !isDisable) {
								setSelected(prev => [...prev, query]);
								setQuery('');
								setMenuOpen(true);
							}
						}}
					/>
				</div>

				{menuOpen ? (
					<div className='card w-full max-h-52 mt-2 p-1 flex overflow-y-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200'>
						<ul className='w-full'>
							{filteredTags?.length ? (
								filteredTags.map((tag, i) => (
									<li
										key={tag}
										className='p-2 cursor-pointer hover:bg-blue-100 hover:text-blue-500 rounded-md w-full'
										onMouseDown={e => e.preventDefault()}
										onClick={() => {
											setMenuOpen(true);
											setSelected(prev => [...prev, tag]);
											setQuery('');
										}}
									>
										{tag}
									</li>
								))
							) : (
								<li className='p-2 text-gray-500'>No options available</li>
							)}
						</ul>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default MultiSelect;
