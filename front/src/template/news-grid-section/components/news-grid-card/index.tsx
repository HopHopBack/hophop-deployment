import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '@/utils/func/formatDate';
import shortText from '@/utils/func/shortText';

import styles from './styles.module.scss';

interface IProps {
	news: INews;
	className?: string;
}

export default function NewsGridCard({ news, className }: IProps) {
	return (
		<Link
			href={`/news/${news.id}`}
			className={`${styles.card} ${className}`}
			data-aos="fade-up"
		>
			<div className={styles.imageWrapper}>
				<Image
					src={news.image || '/default-image.png'}
					width={335}
					height={560}
					alt={news.title}
				/>
			</div>
			<div className={styles.details}>
				<span className={styles.newsTitle}>{shortText(news.title, 72)}</span>
				<span className={styles.newsTime}>{formatDate(news.created_at)}</span>
			</div>
		</Link>
	);
}
