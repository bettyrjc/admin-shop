import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.action';

export const getProductById = async (productId: string) => {
  //TODO:think new product
  try {
    const { data } = await tesloApi.get<Product>(`/products/${productId}`);

    console.log('data', data);
    return {
      ...data,
      images: data.images.map(getProductImageAction),
    };
  } catch (e) {
    console.log(e);
    throw new Error(`Product ${productId}`);
  }
};
