import styles from './styles.module.scss';
import { Check, ChevronUp } from 'lucide-react';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCatalog } from '@/store/filters/Catalog.store';
import { useFetch } from '@/hooks/useFetch';
import Loader from '@/components/Loader/Loader';
import shortText from '@/utils/func/shortText'; // Zustand для зберігання стану

interface ICategoryLocal {
	name: string;
	value: string;
}

export default function SortingCategory() {
	const { data: categories, loading: categoriesLoading } = useFetch<
		ICategory[]
	>({
		endpoint: 'shop/categories/all/',
		options: {
			method: 'GET',
		},
	});

	const data = categories?.map((item) => ({
		name: item.name,
		value: String(item.id),
	}));

	const { setCategory, catalog } = useCatalog();
	const category = catalog.category;
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname(); // Отримуємо поточний шлях

	const [isShow, setIsShow] = useState(true);

	// Отримуємо сортування з URL і зберігаємо його у Zustand
	useEffect(() => {
		const sortFromURL = searchParams.get('category');
		console.log(sortFromURL);

		// Перевіряємо, чи змінювалося сортування в Zustand
		// І не сетаємо його з URL, якщо воно вже існує або збігається зі станом
		if (!sortFromURL && category) {
			// Якщо в URL немає сортування, але в стані воно є — очищуємо його
			setCategory(null);
		} else if (sortFromURL && sortFromURL !== category?.value) {
			// Якщо в URL є нове сортування, але в стані інше або порожнє
			if (!categoriesLoading) {
				const name = data?.find((item) => item.value === sortFromURL)?.name;
				console.log(
					'hz',
					data?.find((item) => item.value === sortFromURL)?.name,
				);
				setCategory({ name: name || '', value: sortFromURL });
			}
		}
	}, [searchParams, setCategory, category, categoriesLoading]);

	const handleSortChange = (item: ICategoryLocal) => {
		setCategory(item); // Оновлюємо стан у Zustand

		const currentParams = new URLSearchParams(searchParams.toString());

		// Якщо `item.value` не null, додаємо параметр у URL, інакше видаляємо
		if (item.value) {
			currentParams.set('category', item.value);
		} else {
			currentParams.delete('category');
		}

		// Використовуємо pathname для оновлення URL
		router.replace(`${pathname}?${currentParams.toString()}`, {
			// shallow: true,
		});
	};

	const selected = data?.find((item) => item.value === category?.value)?.value;
	return (
		<div
			className={`${styles.wrapper} ${categoriesLoading && styles.disabled}`}
		>
			{categoriesLoading && <Loader className={styles.loader} />}
			<div className={styles.container}>
				<div onClick={() => setIsShow(!isShow)} className={styles.title}>
					<span>Category</span>
					<ChevronUp className={`${!isShow && styles.rotate}`} />
				</div>
				{isShow && (
					<div className={styles.items}>
						{data &&
							data.map((item, index) => (
								<div
									onClick={() => handleSortChange(item)}
									key={index}
									className={styles.item}
								>
									<div
										className={`${styles.box} ${selected === item.value && styles.selected}`}
									>
										{selected === item.name && <Check color="#DFE7EB" />}
									</div>
									<span className={robotoCondensed.className}>
										{' '}
										{shortText(item.name, 20)}
									</span>
								</div>
							))}
					</div>
				)}
			</div>
		</div>
	);
}
