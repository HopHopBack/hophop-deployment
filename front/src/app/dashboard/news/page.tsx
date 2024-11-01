import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import DashboardTableNews from '@/components/dashboard/dashboardTableNews/DashboardTableNews';
import EmptyDataBlock from '@/components/dashboard/emptyDataBlock/EmptyDataBlock';

import { getDashboardNewsCreate } from '@/utils/paths/dashboard/dashboard.paths';

import { getDashboardNews } from '@/services/dashboard/news/dashbpard.news.service';

import styles from './styles.module.scss';

export const metadata: Metadata = {
	title: `News - ${process.env.NEXT_PUBLIC_APP_NAME} Dashboard`,
};

export default async function DashboardNews() {
	const news = await getDashboardNews();
	if (!news.success) {
		return notFound();
	}

	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine
				compact={false}
				text={'News'}
				textButton={'Add news'}
				buttonLink={getDashboardNewsCreate()}
				searchType={'news'}
			/>
			{news.data.items.length > 0 ? (
				<DashboardTableNews news={news.data} />
			) : (
				<EmptyDataBlock />
			)}
		</div>
	);
}
