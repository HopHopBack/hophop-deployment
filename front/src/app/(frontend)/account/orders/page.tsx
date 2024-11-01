import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import AccountMenu from '@/components/account-menu';
import EmptyDataBlock from '@/components/dashboard/emptyDataBlock/EmptyDataBlock';
import DashboardTableOrders from '@/components/dashboard/dashboardTableOrders/DashboardTableOrders';

import { fetchWithAuthServer } from '@/services/auth/fetchApiAuthServer.service';

import styles from './page.module.scss';

export const metadata: Metadata = {
	title: `Orders - ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default async function AccountOrdersPage() {
	const res = await fetchWithAuthServer<IResponse<IOrders>>(
		'auth/profile-orders/',
	);

	if (!res.success) {
		return notFound();
	}

	const orders = res.data;

	return (
		<div className={styles.page}>
			<AccountMenu className={styles.menu} />

			<h1 className={styles.title}>Orders History</h1>

			<div className={styles.wrapper}>
				{orders && orders?.items?.length > 0 ? (
					<DashboardTableOrders type={'profile'} orders={orders} />
				) : (
					<EmptyDataBlock />
				)}
			</div>
		</div>
	);
}