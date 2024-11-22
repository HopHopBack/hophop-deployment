import { robotoCondensed } from '@/styles/fonts/fonts';
import styles from './styles.module.scss';

interface IOrderSummary {
	subtotal_price: number;
	total_price: number;
	tax_percent: number;
	shipping_rate: number;
	discount: number | null;
}

interface ITableProps {
	orderSummary: IOrderSummary;
}

export function DashboardTableOrder({ orderSummary }: ITableProps) {
	return (
		<div className={`${styles.orderSummary} ${robotoCondensed.className}`}>
			<ul>
				<li>Subtotal Price: ${orderSummary?.subtotal_price}</li>
				<li>
					Tax ({orderSummary?.tax_percent}%):{' '}
					{orderSummary &&
						(
							orderSummary.subtotal_price *
							(orderSummary.tax_percent / 100)
						).toFixed(2)}
				</li>
				<li>
					Discount: {orderSummary?.discount ? orderSummary?.discount : '$0'}
				</li>
				<li>
					Shipping Rate: $
					{orderSummary?.shipping_rate ? orderSummary?.shipping_rate : '$0'}
				</li>
				<li>
					<strong>Total: ${orderSummary?.total_price}</strong>
				</li>
			</ul>
		</div>
	);
}
