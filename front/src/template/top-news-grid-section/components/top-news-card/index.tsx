import shortText from '@/utils/func/shortText';

import Image from 'next/image';
import styles from './styles.module.scss';

interface IProps {
	news: INews;
	className?: string;
	type: string;
	title: string;
}

export default function TopNewsGridCard({
	news,
	className,
	type,
	title,
}: IProps) {
	const typeContainer = styles[`${type}Container`];
	const typeImage = styles[`${type}Image`];

	return (
		<>
			<div className={styles.title}>
				<h1>{title}</h1>
			</div>
			<picture className={`${typeContainer} ${styles.imageContainer}`}>
				<Image
					src={`/news/${type}Image.png`}
					alt="Market"
					className={`${typeImage} ${styles.newsImage}`}
					fill
				/>
			</picture>
			<div className={styles.description}>
				<h2>
					{news?.title
						? shortText(news.title, 40)
						: 'How the BladeMaster X Transformed Lives'}
				</h2>
			</div>
		</>
	);
}
