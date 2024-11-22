import { notFound } from 'next/navigation';

import { getOrderById } from '@/services/dashboard/orders/dashboard.orders.service';
import DashboardOrderDetails from '@/template/dashboardOrderDetails/DashboardOrderDetails';
import type { Metadata } from 'next';
import { getNewsById } from '@/services/dashboard/news/dashbpard.news.service';

type Props = {
	params: {
		id: string;
	};
};

export async function generateMetadata({
	params: { id },
}: Props): Promise<Metadata> {
	const order = await getOrderById(Number(id));

	if (!order.success) {
		return notFound();
	}

	return {
		title: `Edit ${order.data.id} - ${process.env.NEXT_PUBLIC_APP_NAME} Dashboard`,
	};
}

export default async function DashboardOrderEdit({ params: { id } }: Props) {
	const order = await getOrderById(Number(id));
	if (!order.success) {
		return notFound();
	}
	return <DashboardOrderDetails order={order.data} id={id} />;
}
