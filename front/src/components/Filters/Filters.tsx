import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { useCatalog } from '@/store/filters/Catalog.store';
import styles from './styles.module.scss';
import { robotoCondensed } from '@/styles/fonts/fonts';
import Sorting from '@/components/Sorting/Sorting';
import SortingCategory from '@/components/SortingCategory/SortingCategory';
import PriceFilter from '@/components/PriceFilter/PriceFilter';
import { MAX_PRICE, MIN_PRICE } from '@/utils/consts/consts';

interface IProps {
	disabled?: boolean;
	isLoading?: boolean;
}

// Утиліта для оновлення URL
const updateUrl = (
	param: string,
	searchParams: URLSearchParams,
	router: any,
	pathname: string,
) => {
	searchParams.delete(param);
	router.replace(`${pathname}?${searchParams.toString()}`);
};

const FilterItem = ({
	label,
	onClear,
}: {
	label: string;
	onClear: () => void;
}) => (
	<div
		className={`${styles.reset} ${styles.opacity} ${robotoCondensed.className}`}
	>
		<span>{label}</span>
		<X onClick={onClear} />
	</div>
);

export default function Filters({
	disabled = false,
	isLoading = false,
}: IProps) {
	const [isShow, setIsShow] = useState(true);

	const { setPriceRange, resetAll, setCategory, setSorting } = useCatalog(
		(state) => state,
	);
	const { minPrice, maxPrice, sorting, category } = useCatalog(
		(state) => state.catalog,
	);
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const handleClear = (param: string, clearAction: () => void) => {
		updateUrl(
			param,
			new URLSearchParams(searchParams.toString()),
			router,
			pathname,
		);
		clearAction();
	};

	const resetAllFilters = () => {
		resetAll();
		router.replace('/catalog');
	};

	return (
		<div
			className={`${styles.selectWrapper} ${!isShow && styles.borderNone} ${disabled || (isLoading && styles.disabled)}`}
		>
			<div className={styles.selectContainer}>
				<div
					className={`${styles.select} ${!isShow && styles.borderNoneSelect} `}
					onClick={() => setIsShow(!isShow)}
				>
					<span className={`${robotoCondensed.className} ${styles.value}`}>
						Filters
					</span>
					<SlidersHorizontal />
				</div>
				{isShow && (
					<div className={styles.optionsWrapper}>
						<div className={styles.suggestionsWrapperScrollBar}>
							<div className={styles.suggestionsContainer}>
								<div className={styles.wrappRest}>
									{(category?.name || sorting?.name || minPrice > 0) && (
										<div
											className={`${styles.reset} ${robotoCondensed.className}`}
											onClick={resetAllFilters}
										>
											Clear All
										</div>
									)}
									{category?.name && (
										<FilterItem
											label={category.name}
											onClear={() =>
												handleClear('category', () => setCategory(null))
											}
										/>
									)}
									{sorting?.name && (
										<FilterItem
											label={sorting.name}
											onClear={() =>
												handleClear('ordering', () => setSorting(null))
											}
										/>
									)}
									{maxPrice < MAX_PRICE && (
										<FilterItem
											label={`${minPrice}-${maxPrice}$`}
											onClear={() => {
												handleClear('minPrice', () =>
													setPriceRange(MIN_PRICE, MAX_PRICE),
												);
												handleClear('maxPrice', () =>
													setPriceRange(MIN_PRICE, MAX_PRICE),
												);
											}}
										/>
									)}
								</div>
								<Sorting />
								<PriceFilter />
								<SortingCategory />
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
