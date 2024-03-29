import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'Register account | MY WEB BLOG',
	description: 'Generated by create next app',
};

export default function RegisterLayout({
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
