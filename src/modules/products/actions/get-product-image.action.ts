export const getProductImageAction = (imageName: string): string => {
  return imageName.includes('http')
    ? imageName
    : `${import.meta.env.VITE_BASE_URL}/files/product/${imageName}`;
};
