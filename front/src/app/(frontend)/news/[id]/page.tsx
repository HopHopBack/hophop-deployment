import { NewsId } from '@/template/news-id-grid-section';

type Props = {
	params: {
		id: string;
	};
};

export default function NewsIdPage({ params: { id } }: Props) {
	return <NewsId id={id} />;
}
