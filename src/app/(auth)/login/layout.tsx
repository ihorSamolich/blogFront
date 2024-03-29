import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'Login | MY WEB BLOG',
	description: 'Generated by create next app',
};

export default function LoginLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className='flex flex-col items-center justify-between'>
			{children}
		</main>
	);
}
