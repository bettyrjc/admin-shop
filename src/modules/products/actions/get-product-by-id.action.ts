import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.action';

export const getProductById = async (productId: string): Promise<Product> => {
  if (productId === 'create') {
    return {
      id: '',
      title: '',
      description: '',
      slug: '',
      price: 0,
      stock: 0,
      gender: '' as any,
      images: [],
      tags: [],
      user: {} as any,
      sizes: [],
    };
  }
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
