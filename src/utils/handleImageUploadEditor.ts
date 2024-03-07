const URL = process.env.NEXT_PUBLIC_BASE_URL;

export const handleImageUploadEditor = async (blobInfo: any, failure: any) => {
	try {
		const formData = new FormData();
		formData.append('file', blobInfo.blob(), blobInfo.filename());

		const response = await fetch(`${URL}/api/image`, {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			console.error(`HTTP error! Status: ${response.status}`);
		}

		const json = await response.json();

		if (!json || typeof json.location !== 'string') {
			console.error('Invalid JSON: ' + JSON.stringify(json));
		}

		return `${URL}/images/${json.location}`;
	} catch (error) {
		console.error('Error during image upload:', error);

		if (failure && typeof failure === 'function') {
			failure('Image upload failed');
		}

		throw error;
	}
};
