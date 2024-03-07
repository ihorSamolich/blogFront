'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginForm } from '@/interfaces';
import { login } from '@/lib/data';
import { addCookie } from '@/utils/cookiesStorage';
import { useUserContext } from '@/app/user-provider';
import { tokenDecode } from '@/utils/tokenDecode';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
	const { setUser } = useUserContext();
	const router = useRouter();
	const [errorAuth, setErrorAuth] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<ILoginForm>();

	console.log(errors);

	const onSubmit: SubmitHandler<ILoginForm> = async data => {
		if (data.password.length < 6) {
			setError('password', {
				type: 'min',
				message: 'Пароль повинен містити мінімум 6 символів',
			});

			return;
		}

		const res = await login(data);

		if (res) {
			setUser(tokenDecode(res.token));
			await addCookie('token', res.token);
			setErrorAuth(false);
			router.push('/');
		} else {
			setErrorAuth(true);
			console.log('Помилка входу, перевірте дані!');
		}
	};

	const handleChange = () => {
		if (errorAuth) {
			setErrorAuth(false);
		}
	};

	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Sign in to your blog account
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form
					className='space-y-6'
					onChange={handleChange}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium leading-6 text-gray-900'
						>
							Email address
						</label>
						<div className='mt-2'>
							<input
								id='email'
								type='email'
								autoComplete='email'
								{...register('email', { required: true })}
								className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>

					<div>
						<div className='flex items-center justify-between'>
							<label
								htmlFor='password'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Password
							</label>
						</div>
						<div className='mt-2'>
							<input
								id='password'
								type='password'
								autoComplete='current-password'
								{...register('password', { required: true })}
								className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
						{errors.password && (
							<p className='mt-2 text-center text-sm text-red-600'>
								{errors.password.message}
							</p>
						)}
					</div>

					{errorAuth && (
						<p className='mt-2 text-center text-sm text-red-600'>
							Помилка авторизації перевірте введені дані!
						</p>
					)}

					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Sign in
						</button>
					</div>
				</form>

				<p className='mt-10 text-center text-sm text-gray-500'>
					Not a member?{' '}
					<Link
						href='/register'
						className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
					>
						Register new account now
					</Link>
				</p>
			</div>
		</div>
	);
}
