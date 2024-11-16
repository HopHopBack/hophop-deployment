import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import EmptyDataBlock from '@/components/dashboard/emptyDataBlock/EmptyDataBlock';
import { getUsersDashboardServer } from '@/services/dashboard/users/dashboard.users.service';

import DashboardTable from '@/components/dashboard/dashboardTable/DashboardTable';
import styles from './styles.module.scss';

export const metadata: Metadata = {
	title: `Users - ${process.env.NEXT_PUBLIC_APP_NAME} Dashboard`,
};

export default async function DashboardUsers() {
	const users = await getUsersDashboardServer();

	if (!users.success) {
		notFound();
	}
	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine
				searchType={'customers'}
				compact={true}
				text={'Users'}
			/>
			{users.data.items.length > 0 ? (
				<DashboardTable
					columns={[
						{ key: 'id', label: 'ID' },
						{ key: 'first_name', label: 'First Name' },
						{ key: 'last_name', label: 'Last Name' },
						{ key: 'user_role', label: 'Role' },
						{ key: 'phone_number', label: 'Phone' },
						{ key: 'email', label: 'Email' },
						{ key: 'actions', label: 'Actions' },
					]}
					data={users.data}
				/>
			) : (
				<EmptyDataBlock />
			)}
		</div>
	);
}
