'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { ChevronUp, MoveUp, ShoppingCart } from 'lucide-react';
import { getDashboardOrderStatistics } from '@/services/dashboard/orders/dashboard.orders.service';

interface StatisticItem {
	name: string;
	price: number;
	percentage: number;
}

export function DashboardPurchaseSummary() {
	const [period, setPeriod] = useState('month');
	const [statistics, setStatistics] = useState<StatisticItem[]>([]);
	const [comparisonDate, setComparisonDate] = useState('');
	useEffect(() => {
		const fetchStatistics = async () => {
			try {
				const periodInDays =
					period === 'month' ? 30 : period === 'halfYear' ? 182 : 365;
				const fetchedStatistics =
					await getDashboardOrderStatistics(periodInDays);
				if (fetchedStatistics.success) {
					const statisticsArray = [
						{
							name: 'Total Orders',
							price: fetchedStatistics.data.total_orders,
							percentage: fetchedStatistics.data.total_orders_growth,
						},
						{
							name: 'Active Orders',
							price: fetchedStatistics.data.active_orders,
							percentage: fetchedStatistics.data.active_orders_growth,
						},
						{
							name: 'Completed Orders',
							price: fetchedStatistics.data.completed_orders,
							percentage: fetchedStatistics.data.completed_orders_growth,
						},
						{
							name: 'Returned Orders',
							price: fetchedStatistics.data.returned_orders,
							percentage: fetchedStatistics.data.returned_orders_growth,
						},
					];
					setStatistics(statisticsArray);
				} else {
					console.error('Failed to fetch statistics');
				}
			} catch (error) {
				console.error('Error fetching statistics:', error);
			}
		};
		setComparisonDate(calculateComparisonDate(period));
		fetchStatistics();
	}, [period]);
	return (
		<>
			<DashboardTableSelector
				onPeriodChange={(value: any) => setPeriod(value)}
			/>
			<div className={styles.header_wrapper}>
				{statistics.map((item, i) => (
					<DashboardItem
						key={item.name}
						price={item.price}
						percentage={item.percentage}
						name={item.name}
						comparisonDate={comparisonDate}
					/>
				))}
			</div>
		</>
	);
}

interface DashboardTableSelectorProps {
	onPeriodChange: (period: string) => void;
}

const DashboardTableSelector: React.FC<DashboardTableSelectorProps> = ({
	onPeriodChange,
}) => {
	const [selectedPeriod, setSelectedPeriod] = useState('month');
	const [isVisible, setIsVisible] = useState(false);
	return (
		<div className={styles.selectContainer}>
			<div
				className={`${styles.searchInput} ${robotoCondensed.className}`}
				onClick={() => setIsVisible(!isVisible)}
			>
				<label htmlFor="date-period" className={styles.label}>
					Choose Date Period:
				</label>
				<div className={styles.selectedOption}>
					{selectedPeriod === 'month'
						? 'Month'
						: selectedPeriod === 'halfYear'
							? 'Half Year'
							: 'Year'}
				</div>
				<ChevronUp
					className={`${styles.chevron} ${isVisible ? styles.rotate : ''}`}
				/>
			</div>
			{isVisible && (
				<div className={styles.suggestionsWrapper}>
					{['month', 'halfYear', 'year'].map((option) => (
						<div
							key={option}
							className={styles.suggestionItem}
							onClick={() => {
								setSelectedPeriod(option);
								setIsVisible(false);
								onPeriodChange(option);
							}}
						>
							{option === 'month'
								? 'Month'
								: option === 'halfYear'
									? 'Half Year'
									: 'Year'}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

interface ItemProps {
	name: string;
	price: number;
	percentage: number;
	comparisonDate: string;
}

const calculateComparisonDate = (period: string) => {
	const now = new Date();
	/* eslint-disable */
	switch (period) {
		case 'month':
			now.setMonth(now.getMonth() - 1);
			break;
		case 'halfYear':
			now.setMonth(now.getMonth() - 6);
			break;
		case 'year':
			now.setFullYear(now.getFullYear() - 1);
			break;
		default:
			break;
	}
	/* eslint-enable */
	return now.toLocaleString('en-US', { month: 'long', year: 'numeric' });
};

function DashboardItem(props: ItemProps) {
	const { percentage, price, name, comparisonDate } = props;
	return (
		<div className={styles.item}>
			<span className={styles.item_title}>{name}</span>
			<div className={styles.item_wrapper}>
				<div className={styles.item_container}>
					<div className={styles.price}>
						<div className={styles.basket}>
							<ShoppingCart />
						</div>
						<span>${price}</span>
					</div>
				</div>
				<div className={styles.item_container}>
					<div className={styles.arrow}>
						<MoveUp />
						<span>{percentage}%</span>
					</div>
				</div>
			</div>
			<div className={styles.date}>Compared to {comparisonDate}</div>
		</div>
	);
}
