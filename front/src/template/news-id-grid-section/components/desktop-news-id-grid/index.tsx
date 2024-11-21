import Image from 'next/image';

import { convertStringToHtml } from '@/utils/func/convertStringToHtml';
import { formatDate } from '@/utils/func/formatDate';

import styles from './styles.module.scss';

interface IProps {
	news: INews;
}

export default function DesktopNewsGrid({ news }: IProps) {
	return (
		<div className={styles.newsSection}>
			<div className={styles.textColumn}>
				<h2 className={styles.title}>{news.title}</h2>
				<h3 className={styles.date}>{formatDate(news.created_at)}</h3>
				<div
					className={styles.content}
					dangerouslySetInnerHTML={{
						__html: convertStringToHtml(news.content),
					}}
				/>
			</div>
			<div className={styles.imageColumn}>
				<Image
					width={642}
					height={642}
					src={news.image}
					alt={news.title}
					className={styles.adaptiveImage}
				/>
			</div>
		</div>
	);
}
