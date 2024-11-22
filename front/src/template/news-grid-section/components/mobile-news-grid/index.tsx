import NewsGridCard from '../news-grid-card';

import splitArray from '@/utils/splitArray';

import styles from './styles.module.scss';

interface IProps {
	news: INews[];
}

export default function MobileNewsGrid({ news }: IProps) {
	const splitNewsByCol = splitArray(news);

	return (
		<div className={styles.cardsColWrapper}>
			{splitNewsByCol.map((col, colIndex) => (
				<div key={colIndex} className={styles.cardsCol}>
					{col.map((news) => (
						<NewsGridCard key={news.id} className={styles.card} news={news} />
					))}
				</div>
			))}
		</div>
	);
}
