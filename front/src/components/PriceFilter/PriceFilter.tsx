import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { useCatalog } from '@/store/filters/Catalog.store';
import { getTrackBackground, Range } from 'react-range';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MAX_PRICE, MIN_PRICE } from '@/utils/consts/consts';

export default function PriceFilter() {
	const { minPrice, maxPrice } = useCatalog((state) => state.catalog);
	const setPriceRange = useCatalog((state) => state.setPriceRange);
	const STEP = 1;
	const rtl = false;
	const MIN = MIN_PRICE;
	const MAX = MAX_PRICE;

	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const [isShow, setIsShow] = useState(true);

	// Оновлюємо значення цін з URL
	useEffect(() => {
		const minFromURL = searchParams.get('minPrice');
		const maxFromURL = searchParams.get('maxPrice');

		// Якщо параметри є в URL, оновлюємо стан
		if (minFromURL && maxFromURL) {
			const min = parseFloat(minFromURL);
			const max = parseFloat(maxFromURL);
			if (!isNaN(min) && !isNaN(max)) {
				setPriceRange(min, max);
			}
		}
	}, [searchParams, setPriceRange]);

	// Оновлюємо URL при зміні значень мінімальної та максимальної ціни
	const updateURLWithPriceRange = (min: number, max: number) => {
		const currentParams = new URLSearchParams(searchParams.toString());

		currentParams.set('minPrice', String(min));
		currentParams.set('maxPrice', String(max));

		router.replace(`${pathname}?${currentParams.toString()}`, {
			// shallow: true, // Якщо не потрібно перезавантажувати сторінку
		});
	};

	// Обробка зміни значень повзунка
	const handleRangeChange = (values: number[]) => {
		setPriceRange(values[0], values[1]);
	};
	const handleFinalChange = (values: number[]) => {
		updateURLWithPriceRange(values[0], values[1]);
	};
	// Функція для обробки зміни інпутів
	const handleInputChange = (index: number, value: string) => {
		const numericValue = parseFloat(value);
		if (!isNaN(numericValue)) {
			if (index === 0) {
				setPriceRange(numericValue, maxPrice);
				updateURLWithPriceRange(numericValue, maxPrice);
			} else {
				setPriceRange(minPrice, numericValue);
				updateURLWithPriceRange(minPrice, numericValue);
			}
		}
	};

	const handleInputBlur = () => {
		const clampedMin = Math.max(MIN, Math.min(minPrice, MAX));
		const clampedMax = Math.max(MIN, Math.min(maxPrice, MAX));
		setPriceRange(clampedMin, clampedMax);
		updateURLWithPriceRange(clampedMin, clampedMax);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div onClick={() => setIsShow(!isShow)} className={styles.title}>
					<span>Price Ranges</span>
					<ChevronUp className={`${!isShow && styles.rotate}`} />
				</div>
				{isShow && (
					<div className={styles.items}>
						<div className={styles.rangeContainer}>
							<Range
								values={[minPrice, maxPrice]}
								step={STEP}
								min={MIN}
								max={MAX}
								rtl={rtl}
								onFinalChange={handleFinalChange}
								onChange={handleRangeChange}
								renderTrack={({ props, children }) => (
									<div
										onMouseDown={props.onMouseDown}
										onTouchStart={props.onTouchStart}
										style={{
											...props.style,
											height: '36px',
											display: 'flex',
											width: '100%',
										}}
									>
										<div
											ref={props.ref}
											className={styles.track}
											style={{
												background: getTrackBackground({
													values: [minPrice, maxPrice],
													colors: ['#B5C2C8', '#507178', '#B5C2C8'],
													min: MIN,
													max: MAX,
													rtl,
												}),
											}}
										>
											{children}
										</div>
									</div>
								)}
								renderThumb={({ props }) => (
									<div
										{...props}
										key={props.key}
										className={styles.thumb}
										style={{
											...props.style,
										}}
									>
										<div className={styles.round} />
									</div>
								)}
							/>
						</div>
						<div className={styles.inputWrapper}>
							<input
								type="text"
								value={minPrice}
								onChange={(e) => handleInputChange(0, e.target.value)}
								onBlur={handleInputBlur}
								placeholder={'0'}
								className={`${robotoCondensed.className} ${styles.input}`}
								min={MIN}
							/>
							<div className={styles.line}></div>
							<input
								max={MAX}
								type="text"
								value={maxPrice}
								onChange={(e) => handleInputChange(1, e.target.value)}
								onBlur={handleInputBlur}
								placeholder={'1000'}
								className={`${robotoCondensed.className} ${styles.input}`}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
