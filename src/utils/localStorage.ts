'use client';

export const addToLocalStorage = (keyStorage: string, value: string): void => {
	localStorage.setItem(keyStorage, JSON.stringify(value));
};

export const deleteFromLocalStorage = (keyStorage: string): void => {
	localStorage.removeItem(keyStorage);
};

export const getDateFromLocalStorage = (
	keyStorage: string,
): string | undefined => {
	const storedValue = localStorage.getItem(keyStorage);

	if (storedValue !== null) {
		return storedValue;
	} else {
		return undefined;
	}
};
