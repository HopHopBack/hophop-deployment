import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCouponById } from '@/services/dashboard/coupons/dashboard.coupons.service';
import EditCoupon from '@/template/editCoupon/EditCoupon';

type Props = {
	params: {
		id: string;
	};
};

export async function generateMetadata({
	params: { id },
}: Props): Promise<Metadata> {
	const coupon = await getCouponById(id);

	if (!coupon.success) {
		return notFound();
	}

	return {
		title: `Edit ${coupon.data.code} - ${process.env.NEXT_PUBLIC_APP_NAME} Dashboard`,
	};
}

export default async function DashboardCategoriesId({ params: { id } }: Props) {
	const coupon = await getCouponById(id);

	if (!coupon.success) {
		return notFound();
	}
	return <EditCoupon coupon={coupon.data} />;
}
