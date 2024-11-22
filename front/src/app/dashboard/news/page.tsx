import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import EmptyDataBlock from '@/components/dashboard/emptyDataBlock/EmptyDataBlock';

import { getDashboardNewsCreate } from '@/utils/paths/dashboard/dashboard.paths';

import { getDashboardNews } from '@/services/dashboard/news/dashbpard.news.service';

import DashboardTable from '@/components/dashboard/dashboardTable/DashboardTable';
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
				<DashboardTable
					columns={[
						{ key: 'id', label: 'ID' },
						{ key: 'type', label: 'Type' },
						{ key: 'title', label: 'Title' },
						{ key: 'created_at', label: 'Date' },
						{ key: 'actions', label: 'Actions' },
					]}
					data={news.data}
				/>
			) : (
				<EmptyDataBlock />
			)}
		</div>
	);
}
