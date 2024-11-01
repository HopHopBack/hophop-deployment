import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCategoryById } from '@/services/dashboard/categories/dashboard.categories.service';
import EditCategory from '@/template/editCategory/EditCategory';

type Props = {
	params: {
		id: string;
	};
};

export async function generateMetadata({
	params: { id },
}: Props): Promise<Metadata> {
	const category = await getCategoryById(id);

	if (!category.success) {
		return notFound();
	}

	return {
		title: `Edit ${category.data.name} - ${process.env.NEXT_PUBLIC_APP_NAME} Dashboard`,
	};
}

export default async function DashboardCategoriesId({ params: { id } }: Props) {
	const category = await getCategoryById(id);

	if (!category.success) {
		return notFound();
	}
	return <EditCategory category={category.data} />;
}
