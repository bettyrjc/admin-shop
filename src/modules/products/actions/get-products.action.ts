import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.action';

export const getProductsAction = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await tesloApi.get<Product[]>(
      `/products?offset=${page * limit}&limit=${limit}`,
    );

    return data.map((product) => ({
      ...product,
      images: product.images.map(getProductImageAction),
    }));
  } catch (error: any) {
    throw new Error(error);
  }
};
