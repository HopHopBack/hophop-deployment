import styles from './styles.module.scss';
import { Check, ChevronUp } from 'lucide-react';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCatalog } from '@/store/filters/Catalog.store';

export interface InterfaceISortingItem {
	name: string;
	value: string;
}

const sortingItems: InterfaceISortingItem[] = [
	{ name: 'Newest', value: '-id' },
	{ name: 'Top Sales', value: '-views' },
	{ name: 'Price (High - Low)', value: '-price' },
	{ name: 'Price (Low - High)', value: 'price' },
];

export default function Sorting() {
	const { setSorting, catalog } = useCatalog(); // Управління станом через Zustand
	const sorting = catalog.sorting;
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname(); // Отримуємо поточний шлях

	const [isShow, setIsShow] = useState(true);

	// Отримуємо сортування з URL і зберігаємо його у Zustand
	useEffect(() => {
		const sortFromURL = searchParams.get('ordering');

		// Перевіряємо, чи змінювалося сортування в Zustand
		// І не сетаємо його з URL, якщо воно вже існує або збігається зі станом
		if (!sortFromURL && sorting) {
			// Якщо в URL немає сортування, але в стані воно є — очищуємо його
			setSorting(null);
		} else if (sortFromURL && sortFromURL !== sorting?.value) {
			// Якщо в URL є нове сортування, але в стані інше або порожнє
			const name = sortingItems.find(
				(item) => item.value === sortFromURL,
			)?.name;
			setSorting({ name: name || '', value: sortFromURL });
		}
	}, [searchParams, setSorting, sorting]);

	const handleSortChange = (item: InterfaceISortingItem) => {
		setSorting(item); // Оновлюємо стан у Zustand

		const currentParams = new URLSearchParams(searchParams.toString());

		// Якщо `item.value` не null, додаємо параметр у URL, інакше видаляємо
		if (item.value) {
			currentParams.set('ordering', item.value);
		} else {
			currentParams.delete('ordering');
		}

		// Використовуємо pathname для оновлення URL
		router.replace(`${pathname}?${currentParams.toString()}`, {
			// shallow: true,
		});
	};

	const selected = sortingItems.find(
		(item) => item.value === sorting?.value,
	)?.name;

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div onClick={() => setIsShow(!isShow)} className={styles.title}>
					<span>Sort By</span>
					<ChevronUp className={`${!isShow && styles.rotate}`} />
				</div>
				{isShow && (
					<div className={styles.items}>
						{sortingItems.map((item, index) => (
							<div
								onClick={() => handleSortChange(item)}
								key={index}
								className={styles.item}
							>
								<div
									className={`${styles.box} ${selected === item.name && styles.selected}`}
								>
									{selected === item.name && <Check color="#DFE7EB" />}
								</div>
								<span className={robotoCondensed.className}> {item.name}</span>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
