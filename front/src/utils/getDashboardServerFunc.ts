import {
	getDashboardCategories,
	removeCategoryById,
} from '@/services/dashboard/categories/dashboard.categories.service';
import {
	getDashboardCoupons,
	removeCouponById,
} from '@/services/dashboard/coupons/dashboard.coupons.service';
import { getMessagesDashboardClient } from '@/services/dashboard/messages/dashboard.messages.service';
import {
	deleteNews,
	getDashboardNews,
} from '@/services/dashboard/news/dashbpard.news.service';
import {
	getDashboardOrders,
	removeOrderById,
} from '@/services/dashboard/orders/dashboard.orders.service';
import {
	getDashboardProducts,
	removeProductById,
} from '@/services/dashboard/products/dashboard.products.service';
import { getDashboardUsers } from '@/services/dashboard/users/dashboard.users.service';

export const getDashboardServerFunc = (
	name: string,
	type: 'get' | 'delete',
	page?: number,
	id?: number,
) => {
	const func = {
		products: {
			get: () => getDashboardProducts(page || 1),
			delete: () => removeProductById(id || 0),
		},
		categories: {
			get: () => getDashboardCategories(page || 1),
			delete: () => removeCategoryById(id || 0),
		},
		orders: {
			get: () => getDashboardOrders(page || 1),
			delete: () => removeOrderById(id || 0),
		},
		users: {
			get: () => getDashboardUsers(page || 1),
		},
		messages: {
			get: () => getMessagesDashboardClient(page || 1),
		},
		news: {
			get: () => getDashboardNews(page || 1),
			delete: () => deleteNews(id || 0),
		},
		coupons: {
			get: () => getDashboardCoupons(page || 1),
			delete: () => removeCouponById(id || 0),
		},

		// Add other categories if necessary
	} as const;

	// Type guard to check if name is a valid key in func
	if (name in func) {
		const selectedCategory = func[name as keyof typeof func];

		// Type guard to check if type is a valid key in the selected category
		if (type in selectedCategory) {
			return selectedCategory[type as keyof typeof selectedCategory]();
		}
	}

	throw new Error(`Function for '${name}' does not exist in type '${type}'.`);
};
