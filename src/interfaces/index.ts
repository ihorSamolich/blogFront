export interface ICategory {
	id: number;
	name: string;
	urlSlug: string;
	description: string;
}

export interface ITag {
	id: number;
	name: string;
	urlSlug: string;
	description: string;
}

export interface IPost {
	id: number;
	title: string;
	shortDescription: string;
	description: string;
	meta: string;
	urlSlug: string;
	published: boolean;
	postedOn: Date;
	modified?: Date;
	category: ICategory;
	tags: ITag[];
}

export interface ILoginForm {
	email: string;
	password: string;
}

export interface IUser {
	name: string;
	email: string;
	image: string;
	roles: string[];
}

export interface IRegisterForm {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	imageBase64: string;
}

export interface IPostCreate {
	title: string;
	shortDescription: string;
	description: string;
	meta: string;
	categoryId: number;
	tags?: string[];
}

export interface IImage {
	imageBase64: string;
}
