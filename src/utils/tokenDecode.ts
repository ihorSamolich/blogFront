import { jwtDecode } from 'jwt-decode';
import { IUser } from '@/interfaces';

export const tokenDecode = (token: string) => {
	return jwtDecode<IUser>(token);
};
