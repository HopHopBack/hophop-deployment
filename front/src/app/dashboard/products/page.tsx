import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import EmptyDataBlock from '@/components/dashboard/emptyDataBlock/EmptyDataBlock';
import { getProductsDashboardServer } from '@/services/dashboard/products/dashboard.products.service';
import { getDashboardProductsCreate } from '@/utils/paths/dashboard/dashboard.paths';

import DashboardTable from '@/components/dashboard/dashboardTable/DashboardTable';
import styles from './styles.module.scss';

export const metadata: Metadata = {
	title: `Products - ${process.env.NEXT_PUBLIC_APP_NAME} Dashboard`,
};

export default async function DashboardProducts() {
	const products = await getProductsDashboardServer();

	if (!products.success) {
		return notFound();
	}

	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine
				compact={false}
				text={'Products'}
				textButton={'New Product'}
				buttonLink={getDashboardProductsCreate()}
				searchType={'products'}
			/>
			{products.data.items.length > 0 ? (
				<>
					<DashboardTable
						columns={[
							{ key: 'id', label: 'ID' },
							{ key: 'name', label: 'Product' },
							{ key: 'category.name', label: 'Category' },
							{ key: 'price', label: 'Price' },
							{ key: 'actions', label: 'Actions' },
						]}
						data={products.data}
					/>
				</>
			) : (
				<EmptyDataBlock />
			)}
		</div>
	);
}
