'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Pagination from '@/components/dashboard/pagination/Pagination';
import SectionContainer from '@/components/SectionContainer/SectionContainer';
import NewsGrid from './components/news-grid';

import { getAllNews } from '@/services/fetchData';

import styles from './styles.module.scss';

export default function News() {
	const [newsData, setNewsData] = useState<INews[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [numPages, setNumPages] = useState(3);
	const [itemsCount, setItemsCount] = useState(0);

	useEffect(() => {
		const fetchNews = async (page: number) => {
			try {
				const res = await getAllNews(page);
				if (res.success) {
					setItemsCount(res.data.items_count);
					setNewsData(res.data.items.flat());
					setNumPages(res.data.pagination.num_pages);
				} else {
					console.error('Error fetching news:', res);
				}
			} catch (error) {
				console.error('Error fetching news:', error);
			}
		};

		fetchNews(currentPage);
	}, [currentPage]);

	return (
		<section id="news">
			<div className={styles.ribbonWrapper}>
				<Image
					fill
					objectFit="cover"
					objectPosition="center"
					src={'/ribbonsNewArrivals.svg'}
					alt="img"
					className={styles.ribbon}
				/>
			</div>

			<SectionContainer>
				<h2 className={styles.title}>Check this out</h2>
			</SectionContainer>

			<div className={styles.cards}>
				<NewsGrid news={newsData} />

				<Pagination
					className={styles.pagination}
					num_pages={numPages}
					currentPage={currentPage}
					totalCount={itemsCount}
					pageSize={9}
					onPageChange={setCurrentPage}
				/>
			</div>
		</section>
	);
}
