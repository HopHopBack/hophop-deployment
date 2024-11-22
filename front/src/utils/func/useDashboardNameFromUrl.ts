'use client';
import { usePathname } from 'next/navigation';

export default function useDashboardNameFromUrl() {
	const pathname = usePathname(); // '/dashboard/products/edit'
	const parts = pathname.split('/'); // ['', 'dashboard', 'products', 'edit']

	return parts[2]; // 'products'
}
