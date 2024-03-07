import Link from 'next/link';
interface ITagProps {
	slug: string;
	text: string;
	type?: string;
}

const Tag = ({ slug, text, type }: ITagProps) => {
	return (
		<Link
			href={`/tags/${slug}`}
			className={`text-red-500 mr-3 ${type === 'preview' ? `text-2xl` : `text-sm`} font-medium uppercase`}
		>
			{`${type === 'preview' ? `#${text}` : `${text}`}`}
		</Link>
	);
};

export default Tag;
