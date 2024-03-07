'use client';

import React, { createContext, useContext } from 'react';
import { IUser } from '@/interfaces';
interface UserContextProps {
	user: IUser | null;
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const UserContext = createContext<UserContextProps | undefined>(
	undefined,
);

export const useUserContext = () => {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider');
	}

	return context;
};

export default function UserProvider({
	defaultUser,
	children,
}: {
	defaultUser: IUser | null;
	children: React.ReactNode;
}) {
	const [user, setUser] = React.useState<IUser | null>(defaultUser);

	// useEffect(() => {
	// 	const storedToken = getDateFromLocalStorage('authToken');
	//
	// 	if (storedToken) {
	// 		try {
	// 			const decodedUser = tokenDecode(storedToken);
	// 			setUser(decodedUser);
	// 		} catch (error) {
	// 			console.error('Error decoding token:', error);
	// 		}
	// 	}
	// }, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
