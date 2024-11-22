import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { MAX_PRICE, MIN_PRICE } from '@/utils/consts/consts';

interface ISorting {
	name: string;
	value: string;
}

interface ICategory {
	name: string;
	value: string;
}

interface IState {
	catalog: {
		sorting: ISorting | null;
		category: ICategory | null;
		minPrice: number;
		maxPrice: number;
	};
}

interface IActions {
	setSorting: (payload: ISorting | null) => void;
	setCategory: (payload: ICategory | null) => void;
	setPriceRange: (min: number, max: number) => void;
	resetAll: () => void;
}

export const useCatalog = create<IState & IActions>()(
	devtools(
		persist(
			immer((set) => ({
				catalog: {
					sorting: null,
					category: null,
					minPrice: MIN_PRICE,
					maxPrice: MAX_PRICE,
				},
				setSorting: (payload) =>
					set((state) => {
						state.catalog.sorting = payload;
					}),
				setCategory: (payload) =>
					set((state) => {
						state.catalog.category = payload;
					}),
				setPriceRange: (min, max) =>
					set((state) => {
						state.catalog.minPrice = min;
						state.catalog.maxPrice = max;
					}),
				resetAll: () =>
					set((state) => {
						state.catalog.category = null;
						state.catalog.sorting = null;
						state.catalog.category = null;
						state.catalog.maxPrice = MAX_PRICE;
						state.catalog.minPrice = MIN_PRICE;
					}),
			})),
			{
				name: 'catalog',
			},
		),
		{ name: 'Catalog' },
	),
);
