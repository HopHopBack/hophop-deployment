import { notFound } from 'next/navigation';
import { getProductByID } from '@/services/dashboard/products/dashboard.products.service';
import EditProduct from '@/template/editProduct/EditProduct';
import type { Metadata } from 'next';
import { getOrderById } from '@/services/dashboard/orders/dashboard.orders.service';

type Props = {
	params: {
		id: string;
	};
};

export async function generateMetadata({
	params: { id },
}: Props): Promise<Metadata> {
	const product = await getProductByID(id);

	if (!product.success) {
		return notFound();
	}

	return {
		title: `Edit ${product.data.name} - ${process.env.NEXT_PUBLIC_APP_NAME} Dashboard`,
	};
}

export default async function DashboardProductsId({ params: { id } }: Props) {
	const product = await getProductByID(id);

	if (!product.success) {
		return notFound();
	}

	return <EditProduct product={product.data} />;
}
