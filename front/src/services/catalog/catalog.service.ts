import { fetchData } from '@/services/fetchData';

export const getCatalogData = async (url: string) => {
	return await fetchData<IResponse<IProduct>>(url, {
		method: 'GET',
	});
};
