'use client';

import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IRegisterForm } from '@/interfaces';
import Image from 'next/image';
import { registerUser } from '@/lib/data';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<IRegisterForm>();
	const router = useRouter();
	const [errorAuth, setErrorAuth] = useState<boolean>(false);
	const [previewImg, setPreviewImg] = useState<string>('');

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const input = event.target;
		const file = input.files && input.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = function () {
				setPreviewImg(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const onSubmit: SubmitHandler<IRegisterForm> = async data => {
		if (data.password !== data.confirmPassword) {
			setError('password', {
				type: 'validate',
				message: 'Паролі не співпадають!',
			});

			return;
		}
		if (data.password.length < 6) {
			setError('password', {
				type: 'min',
				message: 'Пароль повинен містити мінімум 6 символів',
			});

			return;
		}

		const registerData: IRegisterForm = { ...data, imageBase64: previewImg };

		const res = await registerUser(registerData);

		if (res) {
			setErrorAuth(false);
			router.push('/login');
		} else {
			setErrorAuth(true);
		}
	};

	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Register your new account
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label
							htmlFor='firstName'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Your first name
						</label>
						<input
							id='firstName'
							type='text'
							{...register('firstName', { required: true })}
							className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Firstname'
						/>
					</div>

					<div>
						<label
							htmlFor='lastName'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Your last name
						</label>
						<input
							id='lastName'
							type='text'
							{...register('lastName', { required: true })}
							className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Lastname'
						/>
					</div>

					<div>
						<label
							htmlFor='email'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Your email
						</label>
						<input
							id='email'
							type='email'
							{...register('email', { required: true })}
							className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='email@user.com'
						/>
					</div>

					<div>
						<label
							htmlFor='password'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Password
						</label>
						<input
							id='password'
							type='password'
							{...register('password', { required: true })}
							placeholder='••••••••'
							className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
						/>
						{errors.password && (
							<p className='mt-2 text-center text-sm text-red-600'>
								{errors.password.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor='confirm-password'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Confirm password
						</label>
						<input
							id='confirm-password'
							type='password'
							placeholder='••••••••'
							{...register('confirmPassword', { required: true })}
							className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
						/>
					</div>

					<div>
						<label
							htmlFor='avatar'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Select your avatar
						</label>
						<div className='flex gap-6 items-center'>
							<div className='shrink-0'>
								{previewImg && (
									<div className='relative h-16 w-16'>
										<Image
											id='preview_img'
											className='object-cover rounded-full'
											src={previewImg}
											alt='Current profile photo'
											fill
										/>
									</div>
								)}
							</div>
							<div className='block'>
								<span className='sr-only'>Choose profile photo</span>
								<input
									id='avatar'
									type='file'
									required
									onChange={handleFileChange}
									className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0'
								/>
							</div>
						</div>
					</div>

					{errorAuth && (
						<p className='mt-2 text-center text-sm text-red-600'>
							Помилка реєстрації перевірте введені дані!
						</p>
					)}

					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Create account
						</button>
					</div>
				</form>

				<p className='mt-10 text-center text-sm text-gray-500'>
					Already have an account?{' '}
					<Link
						href='/login'
						className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
					>
						Login here
					</Link>
				</p>
			</div>
		</div>
	);
}
