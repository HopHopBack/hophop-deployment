import NewsGridCard from '../news-grid-card';

import chunkArray from '@/utils/chunkArray';

import styles from './styles.module.scss';

interface IProps {
	news: INews[];
}

export default function DesktopNewsGrid({ news }: IProps) {
	const chunkedNews = chunkArray(news, 3);

	return (
		<>
			{chunkedNews.map((row, rowIndex) => (
				<div key={rowIndex} className={styles.cardsRow}>
					{row.map((news) => (
						<NewsGridCard key={news.id} className={styles.card} news={news} />
					))}
				</div>
			))}
		</>
	);
}
