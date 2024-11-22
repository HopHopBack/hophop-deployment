import AccountMenu from '@/components/account-menu';

import OrderId from '@/template/OrderIdPage';
import styles from './page.module.scss';

type Props = {
	params: {
		id: string;
	};
};

export default async function AccountOrderPage({ params: { id } }: Props) {
	return (
		<div className={styles.page}>
			<AccountMenu className={styles.menu} />

			<h1 className={styles.title}>Order Details</h1>
			<OrderId id={id} />
		</div>
	);
}
