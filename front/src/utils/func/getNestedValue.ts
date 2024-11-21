// The function will return the value that is deep in the object along the specified path.
// If at least one of the intermediate objects does not exist, the function will return null.

export const getNestedValue = (obj: any, path: string): any => {
	return path.split('.').reduce((o, p) => (o ? o[p] : null), obj);
};
