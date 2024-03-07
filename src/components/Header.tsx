'use client';

import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserContext } from '@/app/user-provider';
import { useState } from 'react';
import { deleteCookie } from '@/utils/cookiesStorage';

const URL = process.env.NEXT_PUBLIC_BASE_URL;

const navigation = [
	{ name: 'Home', href: '/' },
	{ name: 'Blog', href: '/blog' },
	{ name: 'Tags', href: '/tags' },
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

const Header = () => {
	const pathName = usePathname();
	const { user, setUser } = useUserContext();
	const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);

	const logout = async () => {
		await deleteCookie('token');
		setUser(null);
	};

	return (
		<Disclosure as='nav'>
			{({ open }) => (
				<>
					<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
						<div className='flex h-16 items-center justify-between'>
							<Link href={'/'} className='flex gap-5 items-center'>
								<div className='relative flex-shrink-0 h-14 w-14'>
									<Image
										src='/icon-blog.png'
										alt='Your Company'
										className='object-cover'
										priority
										sizes='40'
										fill
									/>
								</div>
								<h3 className='h-6 text-2xl font-semibold'>MyBlog</h3>
							</Link>

							<div className='hidden md:block'>
								<div className='ml-10 flex items-center space-x-4'>
									{navigation.map(item => (
										<Link
											key={item.name}
											href={item.href}
											className={classNames(
												item.href === pathName
													? 'font-bold bg-blue-400 text-black'
													: 'text-black hover:bg-blue-100',
												'rounded-md px-3 py-2 text-sm font-medium',
											)}
											aria-current={item.href === pathName ? 'page' : undefined}
										>
											{item.name}
										</Link>
									))}

									{user ? (
										<div className='relative inline-block text-left'>
											<div>
												<button
													onClick={() =>
														setUserMenuOpen(prevState => !prevState)
													}
												>
													<div className='relative bg-blue-500 rounded-full w-10 h-10 flex'>
														<Image
															src={`${URL}/images/${user?.image}`}
															className='rounded-full'
															alt='Rounded avatar'
															sizes={'200'}
															fill
														/>
													</div>
												</button>
											</div>

											{userMenuOpen && (
												<div className='z-50 absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
													<div className='py-2 bg-amber-100 text-black block px-4 text-sm'>
														<div className='flex gap-3 justify-center items-center'>
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
																	d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
																/>
															</svg>
															<p className='font-bold'>{user.name}</p>
														</div>
													</div>

													<Link
														href={'/blog/create'}
														className='py-2 text-gray-700 block px-4 text-sm'
													>
														<div className='flex gap-3 items-center'>
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
																	d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
																/>
															</svg>
															<p className='font-bold'>Create new post</p>
														</div>
													</Link>

													<button
														onClick={logout}
														className='py-2 text-gray-700 block px-4 text-sm'
													>
														<div className='flex gap-3 items-center'>
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
																	d='M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9'
																/>
															</svg>

															<p className='font-bold'>Exit</p>
														</div>
													</button>
												</div>
											)}
										</div>
									) : (
										<Link href={'/login'} className=''>
											<div className='relative w-9 h-9'>
												<Image
													src='/login.png'
													alt='Rounded avatar'
													fill
													sizes={'50'}
												/>
											</div>
										</Link>
									)}
								</div>
							</div>

							<div className='-mr-2 flex md:hidden'>
								<Disclosure.Button className='relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
									<span className='absolute -inset-0.5' />
									<span className='sr-only'>Open main menu</span>
									{open ? (
										<XMarkIcon className='block h-6 w-6' aria-hidden='true' />
									) : (
										<Bars3Icon className='block h-6 w-6' aria-hidden='true' />
									)}
								</Disclosure.Button>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='md:hidden'>
						<div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
							{user ? (
								<div className='text-left'>
									<div className='py-2 bg-amber-100 text-black block px-4 text-sm'>
										<div className='flex gap-3 justify-center items-center'>
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
													d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
												/>
											</svg>
											<p className='font-bold'>{user.name}</p>
										</div>
									</div>

									<Link
										href={'/blog/create'}
										className='py-2 text-gray-700 block px-4 text-sm'
									>
										<div className='flex gap-3 items-center'>
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
													d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
												/>
											</svg>
											<p className='font-bold'>Create new post</p>
										</div>
									</Link>

									<button
										onClick={logout}
										className='py-2 text-gray-700 block px-4 text-sm'
									>
										<div className='flex gap-3 items-center'>
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
													d='M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9'
												/>
											</svg>

											<p className='font-bold'>Exit</p>
										</div>
									</button>
								</div>
							) : (
								<Link href={'/login'} className=''>
									<div className='flex justify-center gap-3 items-center'>
										<div className='relative w-9 h-9'>
											<Image
												src='/login.png'
												alt='Rounded avatar'
												fill
												sizes={'50'}
											/>
										</div>
										<p className='font-bold'>Login</p>
									</div>
								</Link>
							)}

							{navigation.map(item => (
								<Link
									key={item.name}
									href={item.href}
									className={classNames(
										item.href === pathName
											? 'font-bold bg-blue-400 text-black'
											: 'text-black hover:bg-blue-100',
										'block rounded-md px-3 py-2 text-base font-medium',
									)}
									aria-current={item.href === pathName ? 'page' : undefined}
								>
									{item.name}
								</Link>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default Header;
