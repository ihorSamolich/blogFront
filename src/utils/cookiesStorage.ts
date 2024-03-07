'use server';

import { cookies } from 'next/headers';

export const addCookie = async (key: string, data: string) => {
	cookies().set(key, data);
};

export const getCookie = async (key: string) => {
	const cookieStore = cookies();
	return cookieStore.get(key);
};

export const deleteCookie = async (key: string) => {
	cookies().delete(key);
};
