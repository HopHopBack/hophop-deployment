import NewsIdGrid from './components/news-id-grid';

import { getNewsById } from '@/services/fetchData';

interface IProps {
	id: string;
}

export async function NewsId({ id }: IProps) {
	const news = await getNewsById(id);

	return (
		<section>
			<NewsIdGrid news={news.data} />
		</section>
	);
}
