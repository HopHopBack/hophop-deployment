import Image from 'next/image';

import { convertStringToHtml } from '@/utils/func/convertStringToHtml';
import { formatDate } from '@/utils/func/formatDate';

import styles from './styles.module.scss';

interface IProps {
	news: INews;
}

export default function MobileNewsGrid({ news }: IProps) {
	return (
		<div className={styles.newsSection}>
			<h1 className={styles.title}>{news.title}</h1>
			<h2 className={styles.date}>{formatDate(news.created_at)}</h2>
			<div className={styles.imageWrapper}>
				<Image
					src={news.image}
					alt={news.title}
					layout="responsive"
					width={0}
					height={0}
					className={styles.image}
				/>
			</div>
			<div
				className={styles.content}
				dangerouslySetInnerHTML={{
					__html: convertStringToHtml(news.content),
				}}
			/>
		</div>
	);
}
