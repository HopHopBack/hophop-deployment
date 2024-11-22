import { DashboardPurchaseSummary } from '@/components/dashboard/dashboardPurchaseSummary';
import styles from './styles.module.scss';
import { getOrdersDashboardServer } from '@/services/dashboard/orders/dashboard.orders.service';
import EmptyDataBlock from '@/components/dashboard/emptyDataBlock/EmptyDataBlock';

export default async function Dashboard() {
	// need rewrite DashboardTableOrders?
	// const orders = await getOrdersDashboardServer();
	// const limitedOrders =
	// 	orders.data.items?.length > 6
	// 		? orders.data.items.slice(0, 6)
	// 		: orders.data.items;
	return (
		<section className={styles.wrapper}>
			<div className={styles.header}>
				<h2 className={styles.title}>Dashboard</h2>
				<DashboardPurchaseSummary />
			</div>
			{/* <>
				<h2 className={styles.title}>Recent Orders</h2>
				{limitedOrders?.length > 0 ? (
					<DashboardTableOrders
						orders={{ ...orders.data, items: limitedOrders }}
					/>
				) : (
					<EmptyDataBlock />
				)}
			</> */}
		</section>
	);
}
