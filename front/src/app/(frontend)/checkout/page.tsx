import type { Metadata } from 'next';

import CheckoutHeader from '@/app/(frontend)/checkout/components/checkoutHeader/CheckoutHeader';
import Delivery from '@/app/(frontend)/checkout/components/delivery/Delivery';
import FinishedCheckout from '@/app/(frontend)/checkout/components/finishedCheckout/FinishedCheckout';
import Order from '@/app/(frontend)/checkout/components/order/Order';
import Payment from '@/app/(frontend)/checkout/components/payment/Payment';
import PersonalData from '@/app/(frontend)/checkout/components/personalData/PersonalData';

import styles from './styles.module.scss';

export const metadata: Metadata = {
	title: `Checkout - ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function Checkout() {
	return (
		<section className={styles.wrapper}>
			<div className={styles.first}>
				<CheckoutHeader />
				<PersonalData />
				<Delivery />
				<Payment />
				<FinishedCheckout />
			</div>
			<div className={styles.second}>
				<Order />
			</div>
		</section>
	);
}
