import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import EmptyDataBlock from '@/components/dashboard/emptyDataBlock/EmptyDataBlock';

import { getDashboardCategoriesServer } from '@/services/dashboard/categories/dashboard.categories.service';

import { getDashboardCategoriesCreate } from '@/utils/paths/dashboard/dashboard.paths';

import DashboardTable from '@/components/dashboard/dashboardTable/DashboardTable';
import styles from './styles.module.scss';

export const metadata: Metadata = {
	title: `Categories - ${process.env.NEXT_PUBLIC_APP_NAME} Dashboard`,
};

export default async function DashboardCategories() {
	const categories = await getDashboardCategoriesServer();

	if (!categories.success) {
		return notFound();
	}
	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine
				compact={false}
				text={'Categories'}
				textButton={'New category'}
				buttonLink={getDashboardCategoriesCreate()}
				searchType={'categories'}
			/>
			{categories.data.items.length > 0 ? (
				<DashboardTable
					columns={[
						{ key: 'id', label: 'ID' },
						{ key: 'name', label: 'Category' },
						{ key: 'description', label: 'Description' },
						{ key: 'actions', label: 'Actions' },
					]}
					data={categories.data}
				/>
			) : (
				<EmptyDataBlock />
			)}
		</div>
	);
}
