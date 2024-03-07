import { ILoginForm, IPostCreate, IRegisterForm } from '@/interfaces';

const URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchPosts = async () => {
	const res = await fetch(`${URL}/api/blog/posts`);
	if (!res.ok) {
		throw new Error('Some fetch error!');
	}
	return res.json();
};

export const fetchLatestPosts = async () => {
	const res = await fetch(`${URL}/api/blog/posts/latest`);
	if (!res.ok) {
		throw new Error('Some fetch error!');
	}
	return res.json();
};

export const fetchPostBySlug = async (slug: string) => {
	const res = await fetch(`${URL}/api/blog/post/${slug}`);
	if (!res.ok) {
		throw new Error('Some fetch error!');
	}
	return res.json();
};

export const fetchPostsByCategory = async (slug: string) => {
	const res = await fetch(`${URL}/api/blog/category/${slug}/posts`);
	if (!res.ok) {
		throw new Error('Some fetch error!');
	}
	return res.json();
};

export const fetchPostsByTag = async (slug: string) => {
	const res = await fetch(`${URL}/api/blog/tag/${slug}/posts`);
	if (!res.ok) {
		throw new Error('Some fetch error!');
	}
	return res.json();
};

export const fetchCategories = async () => {
	const res = await fetch(`${URL}/api/blog/categories`);
	if (!res.ok) {
		throw new Error('Some fetch error!');
	}
	return res.json();
};

export const fetchTags = async () => {
	const res = await fetch(`${URL}/api/blog/tags`);
	if (!res.ok) {
		throw new Error('Some fetch error!');
	}
	return res.json();
};

export const fetchCategoryBySlug = async (slug: string) => {
	const res = await fetch(`${URL}/api/blog/category/${slug}`);
	if (!res.ok) {
		throw new Error('Some fetch error!');
	}
	return res.json();
};

export const fetchTagBySlug = async (slug: string) => {
	const res = await fetch(`${URL}/api/blog/tag/${slug}`);
	if (!res.ok) {
		throw new Error('Some fetch error!');
	}
	return res.json();
};

export const login = async (loginData: ILoginForm) => {
	const res = await fetch(`${URL}/api/user/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(loginData),
	});

	if (!res.ok) {
		return undefined;
	}

	return res.json();
};

export const registerUser = async (registerData: IRegisterForm) => {
	const res = await fetch(`${URL}/api/user/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(registerData),
	});

	if (!res.ok) {
		return undefined;
	}

	return res.json();
};

export const addPost = async (post: IPostCreate) => {
	const res = await fetch(`${URL}/api/blog/posts`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(post),
	});

	if (!res.ok) {
		return undefined;
	}

	return res.json();
};
