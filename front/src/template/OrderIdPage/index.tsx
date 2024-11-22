import DashboardTable from '@/components/dashboard/dashboardTable/DashboardTable';
import OrderDetailsPictures from '@/components/OrderDetailsPictures/OrderDetailsPictures';
import { getOrderById } from '@/services/dashboard/orders/dashboard.orders.service';
import styles from './styles.module.scss';

interface IProps {
	id: string;
}

interface BlockData {
	title: string;
	content: string[];
}

export default async function OrderId({ id }: IProps) {
	const order = await getOrderById(Number(id));

	if (!order) {
		return <div>Error</div>;
	}

	const blockData: BlockData[] = [
		{
			title: 'General Data',
			content: [
				`Order ID: ${order.data.id}`,
				`Date: ${order.data.created_at}`,
				`Status: ${order.data.order_status}`,
			],
		},
		{
			title: 'Personal Data',
			content: [
				`${order.data.first_name} ${order.data.last_name}`,
				order.data.email,
				order.data.phone,
			],
		},
		{
			title: 'Delivery',
			content: [
				'Address:',
				`${order.data.shipping_country}, ${order.data.shipping_city}`,
				order.data.shipping_address,
			],
		},
		{
			title: 'Payment',
			content: [
				`${order.data.payment_type}, Person Name`,
				'Credentials',
				'Phone',
			],
		},
	];

	const renderBlock = ({ title, content }: BlockData) => (
		<div className={styles.orderBlock} key={title}>
			<h3 className={styles.title}>{title}</h3>
			{content.map((text, index) => (
				<p className={styles.text} key={index}>
					{text}
				</p>
			))}
		</div>
	);

	const orderSummary = {
		subtotal_price: order.data.subtotal_price,
		total_price: order.data.total_price,
		tax_percent: order.data.tax_percent,
		shipping_rate: order.data.shipping_rate,
		discount: order.data.discount,
	};

	const orderData = {
		items: order.data.items.map(({ product, quantity, price }: any) => ({
			id: product.id,
			name: product.name,
			quantity,
			price,
		})),
		pagination: undefined,
	};

	return (
		<section className={styles.orderSection}>
			<OrderDetailsPictures status={order.data.order_status} />
			<div className={styles.orderDetails}>{blockData.map(renderBlock)}</div>
			<DashboardTable
				columns={[
					{ key: 'id', label: 'ID' },
					{ key: 'name', label: 'Product Name' },
					{ key: 'quantity', label: 'Quantity' },
					{ key: 'price', label: 'Price' },
				]}
				data={orderData}
				orderSummary={orderSummary}
			/>
		</section>
	);
}
