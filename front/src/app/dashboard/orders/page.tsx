import { notFound } from 'next/navigation';

import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import EmptyDataBlock from '@/components/dashboard/emptyDataBlock/EmptyDataBlock';
import { getOrdersDashboardServer } from '@/services/dashboard/orders/dashboard.orders.service';

import DashboardTable from '@/components/dashboard/dashboardTable/DashboardTable';
import type { Metadata } from 'next';
import styles from './styles.module.scss';

export const metadata: Metadata = {
	title: `Orders - ${process.env.NEXT_PUBLIC_APP_NAME} Dashboard`,
};

export default async function DashboardOrders() {
	const orders = await getOrdersDashboardServer();
	if (!orders.success) {
		return notFound();
	}
	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine compact={true} text={'Orders'} searchType={'orders'} />
			{orders?.data.items?.length > 0 ? (
				<DashboardTable
					columns={[
						{ key: 'id', label: 'ID' },
						{ key: 'order_status', label: 'Order Status' },
						{ key: 'payment_status', label: 'Payment Status' },
						{ key: 'total_quantity', label: 'Quantity' },
						{ key: 'total_price', label: 'Price' },
						{ key: 'created_at', label: 'Date' },
						{ key: 'actions', label: 'Actions' },
					]}
					data={orders.data}
				/>
			) : (
				<EmptyDataBlock />
			)}
		</div>
	);
}
