/* eslint-disable indent */
import { useState } from 'react';

import EditButton from '../editButton/editButton';
import ModalConfirmation from '../modalConfirmation/ModalСonfirmation';
import RemoveButton from '../removeButton/RemoveButton';
import { IDataItem } from './DashboardTable';

import { formatDate } from '@/utils/func/formatDate';
import { getNestedValue } from '@/utils/func/getNestedValue';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';
import shortText from '@/utils/func/shortText';
import { getDashboardServerFunc } from '@/utils/getDashboardServerFunc';

import { robotoCondensed } from '@/styles/fonts/fonts';
import styles from './styles.module.scss';

interface DashboardItemProps {
	item: IDataItem;
	dashboardName: string;
	columns: Array<{ key: string; label: string }>;
	setError: (text: string | null) => void;
	setNewData: (data: any) => void;
	setSuccess: (text: string | null) => void;
	setIsLoading: (isLoading: boolean) => void;
	type?: 'profile' | 'dashboard';
}

const shouldShowRemoveButton = (
	dashboardName: string,
	restrictedNames: string[],
): boolean => {
	return !restrictedNames.includes(dashboardName);
};

export default function DashboardItem({
	item,
	columns,
	setNewData,
	setError,
	setSuccess,
	setIsLoading,
	dashboardName,
	type = 'dashboard',
}: DashboardItemProps) {
	const [isShow, setIsShow] = useState<boolean>(false);
	const restrictedNames = ['users', 'messages'];
	const handleRemove = async () => {
		setIsLoading(true);

		const res = await getDashboardServerFunc(
			dashboardName,
			'delete',
			undefined,
			item.id,
		);

		if (res.success) {
			const updatedData = await getDashboardServerFunc(dashboardName, 'get', 1);
			if (updatedData.success) {
				setNewData(updatedData.data);
				setIsShow(false);
				setSuccess(`Item ${item.id} was deleted`);
				await revalidateFunc(`/dashboard/${dashboardName}`);
				await revalidateFunc(`/dashboard/${dashboardName}/[id]`, 'page');
				await revalidateFunc(`/${dashboardName.slice(0, -1)}/[id]`, 'page');
				await revalidateFunc('/', 'layout');
				setTimeout(() => {
					setSuccess(null);
				}, 3000);
			}
		} else {
			setError(res.error?.message || 'Something went wrong');
			setTimeout(() => {
				setError(null);
			}, 5000);
		}
		setIsLoading(false);
	};

	return (
		<>
			{isShow && (
				<ModalConfirmation
					reset={handleRemove}
					closeModal={() => setIsShow(false)}
					text="Are you sure?"
				/>
			)}
			<li
				key={item.id}
				className={`${styles.tableRow} ${robotoCondensed.className}`}
			>
				{columns.map((column, index) => (
					<div
						key={`${column.key}-${item.id}-${index}`}
						className={`${styles.col} ${styles[`col-${columns.length + (column.key === 'id' || column.key === 'actions' ? 4 : 0)}`]}`}
					>
						{column.key === 'actions' ? (
							<>
								<EditButton
									callback={() =>
										type === 'dashboard'
											? `/dashboard/${dashboardName}/${item.id}`
											: `/account/${dashboardName}/${item.id}`
									}
									type={
										dashboardName === 'messages' || dashboardName === 'orders'
											? 'view'
											: 'edit'
									}
								/>
								{shouldShowRemoveButton(dashboardName, restrictedNames) &&
								type === 'dashboard' ? (
									<RemoveButton callback={() => setIsShow(true)} />
								) : null}
							</>
						) : column.key === 'id' ? (
							getNestedValue(item, column.key)
						) : (
							shortText(
								column.key === 'created_at'
									? formatDate(getNestedValue(item, column.key))
									: `${getNestedValue(item, column.key)}`,
							)
						)}
					</div>
				))}
			</li>
		</>
	);
}
