'use client';
import Pagination from '@/components/dashboard/pagination/Pagination';
import styles from './styles.module.scss';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Suspense, useEffect, useState } from 'react';
import Filters from '@/components/Filters/Filters';
import { useCatalog } from '@/store/filters/Catalog.store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getCatalogData } from '@/services/catalog/catalog.service';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { useDebounce } from '@/hooks/useDebounce';
import Loading from '@/components/loading/Loading';
import { MAX_PRICE, MIN_PRICE } from '@/utils/consts/consts';

export default function CatalogPage() {
	return (
		<Suspense fallback={<Loading />}>
			<CatalogPageContent />
		</Suspense>
	);
}

function CatalogPageContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const { catalog } = useCatalog();
	const sorting = catalog.sorting;
	const category = catalog.category;
	const minPrice = catalog.minPrice;
	const maxPrice = catalog.maxPrice;

	const [page, setPage] = useState<number>(
		Number(searchParams.get('page')) || 1,
	);
	const [data, setData] = useState<IResponse<IProduct>>();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState('');

	const debouncedSearch = useDebounce(search, 500);
	const debouncedMinPrice = useDebounce(minPrice, 500);
	const debouncedMaxPrice = useDebounce(maxPrice, 500);

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const sortValue = sorting?.value ? `&ordering=${sorting.value}` : '';
			const minValue =
				debouncedMinPrice > MIN_PRICE ? `&price_min=${debouncedMinPrice}` : '';
			const maxValue =
				debouncedMaxPrice < MAX_PRICE ? `&price_max=${debouncedMaxPrice}` : '';
			const searchValue =
				debouncedSearch.length > 0 ? `&name=${debouncedSearch}` : '';

			const categoryValue = category?.value
				? `&category=${category.value}`
				: '';

			const res = await getCatalogData(
				`shop/products/?page=${page}${sortValue}${categoryValue}${searchValue}${minValue}${maxValue}`,
			);
			setData(res.data);
		} catch (error) {
			setError('Failed to fetch products');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		page,
		sorting,
		category,
		debouncedSearch,
		debouncedMinPrice,
		debouncedMaxPrice,
	]);

	if (isLoading) {
		return (
			<div style={{ minHeight: '100vh' }}>
				<Loading />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Catalog</h1>
				<input
					className={`${robotoCondensed.className} ${styles.input}`}
					placeholder={'Search'}
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<div className={styles.body}>
				<Filters />
				<div className={styles.data}>
					<div className={styles.products}>
						{data?.items.map((product) => (
							<div className={styles.product} key={product.id}>
								<ProductCard
									type={'catalog'}
									product={product}
									showCategory={true}
									showButtons={{ favorite: true, cart: true, checkout: true }}
								/>
							</div>
						))}
					</div>
					<div className={styles.pagination}>
						<Pagination
							num_pages={data!.pagination?.num_pages}
							currentPage={data!.pagination?.current_page}
							totalCount={data!.items_count}
							pageSize={10}
							onPageChange={async (newPage) => {
								setPage(newPage);
								router.replace(`${pathname}?page=${newPage}`);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
