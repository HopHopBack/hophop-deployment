'use client';
import { useState } from 'react';

import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
import Pagination from '../pagination/Pagination';
import DashboardItem from './DashboardItem';
import { DashboardTableOrder } from './DashboardTableOrder';

import useDashboardNameFromUrl from '@/utils/func/useDashboardNameFromUrl';
import { getDashboardServerFunc } from '@/utils/getDashboardServerFunc';

import styles from './styles.module.scss';

export interface IDataItem {
	[key: string]: any;
}

interface IPagination {
	current_page: number;
	num_pages: number;
}

interface IData {
	items?: IDataItem[];
	items_count?: number;
	pagination?: IPagination;
}

interface IOrderSummary {
	subtotal_price: number;
	total_price: number;
	tax_percent: number;
	shipping_rate: number;
	discount: number | null;
}

interface ITableProps {
	columns: Array<{ key: string; label: string }>;
	data: IData;
	type?: 'profile' | 'dashboard';
	orderSummary?: IOrderSummary;
}

export default function DashboardTable({
	columns,
	data,
	orderSummary,
	type = 'dashboard',
}: ITableProps) {
	const dashboardName = useDashboardNameFromUrl();
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [newData, setNewData] = useState<any>(data);

	const handlePageChange = async (page?: number) => {
		setIsLoading(true);
		const res = await getDashboardServerFunc(dashboardName, 'get', page);

		if (res.success) {
			setNewData(res.data);
		} else {
			setError('Failed to load data');
		}

		setIsLoading(false);
	};

	return (
		<>
			{isLoading && <Loader />}
			{error && <MessageError type={'dashboard'} text={error} />}
			{success && <MessageSuccess type={'dashboard'} text={success} />}
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<ul className={styles.responsiveTable}>
						<li className={styles.tableHeader}>
							{columns.map((column) => (
								<div
									key={column.key}
									className={`${styles.col} ${styles[`col-${column.key === 'id' || column.key === 'actions' ? columns.length + 4 : columns.length}`]}`}
								>
									{column.label}
								</div>
							))}
						</li>
						{newData.items.map((item: any, index: number) => (
							<DashboardItem
								dashboardName={dashboardName}
								key={index}
								item={item}
								columns={columns}
								type={type}
								setNewData={setNewData}
								setError={setError}
								setSuccess={setSuccess}
								setIsLoading={setIsLoading}
							/>
						))}
					</ul>
					{orderSummary ? (
						<DashboardTableOrder orderSummary={orderSummary} />
					) : null}
				</div>
				{data.pagination ? (
					<Pagination
						num_pages={newData.pagination.num_pages}
						currentPage={newData.pagination.current_page}
						totalCount={newData.items_count}
						pageSize={10}
						onPageChange={handlePageChange}
					/>
				) : null}
			</div>
		</>
	);
}
