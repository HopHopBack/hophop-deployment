import NotFound from 'next/dist/client/components/not-found-error';

import { getDashboardUserById } from '@/services/dashboard/users/dashboard.users.service';
import DashboardUserTemplate from '@/template/dashboardUserTemplate/DashboardUserTemplate';

import styles from './styles.module.scss';
import type { Metadata } from 'next';
import { getProductByID } from '@/services/dashboard/products/dashboard.products.service';
import { notFound } from 'next/navigation';

type Props = {
	params: {
		id: string;
	};
};

export async function generateMetadata({
	params: { id },
}: Props): Promise<Metadata> {
	const user = await getDashboardUserById(id);
	if (!user.success) {
		return notFound();
	}

	return {
		title: `Edit ${user.data.first_name} ${user.data.last_name} - ${process.env.NEXT_PUBLIC_APP_NAME} Dashboard`,
	};
}

export default async function DashboardProductsId({ params: { id } }: Props) {
	const user = await getDashboardUserById(id);
	if (!user.success) {
		return NotFound();
	}
	return (
		<div className={styles.wrapper}>
			<DashboardUserTemplate user={user.data} />
		</div>
	);
}
