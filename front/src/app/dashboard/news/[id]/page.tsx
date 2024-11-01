import { getNewsById } from '@/services/dashboard/news/dashbpard.news.service';
import EditNews from '@/template/editNews/EditNews';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCouponById } from '@/services/dashboard/coupons/dashboard.coupons.service';

type Props = {
	params: {
		id: string;
	};
};

export async function generateMetadata({
	params: { id },
}: Props): Promise<Metadata> {
	const news = await getNewsById(id);

	if (!news.success) {
		return notFound();
	}

	return {
		title: `Edit ${news.data.title} - ${process.env.NEXT_PUBLIC_APP_NAME} Dashboard`,
	};
}

export default async function DashboardNewsId({ params: { id } }: Props) {
	const news = await getNewsById(id);

	if (!news.success) {
		return notFound();
	}
	return <EditNews news={news.data} />;
}
