import { fetchLatestPosts } from '@/lib/data';
import { IPost } from '@/interfaces';
import PostPreview from '@/components/PostPreview';

export default async function Home() {
	const posts: IPost[] = await fetchLatestPosts();

	return (
		<main className='flex flex-col items-center justify-between'>
			<div className='z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex '>
				<div className='divide-y divide-gray-200'>
					<div className='space-y-2 pb-8 pt-6 md:space-y-5'>
						<h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
							Latest
						</h1>
						<p className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
							The rest of the news and start reading
						</p>
					</div>
					<ul className='divide-y divide-gray-200'>
						{posts.map(post => (
							<PostPreview key={post.id} post={post} />
						))}
					</ul>
				</div>
			</div>
		</main>
	);
}
