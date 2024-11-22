export function convertStringToHtml(str: string) {
	const convert = str
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/\/p/gi, 'p');

	return convert
		.replace(/\\p/g, '/p')
		.replace(/\\n/g, '</br>')
		.replace(/<code>/g, '')
		.replace(/<pre>/g, '');
}
