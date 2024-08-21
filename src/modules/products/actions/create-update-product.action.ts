import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';

export const createUpdateProductAction = async (product: Partial<Product>) => {
  const productId = product.id;
  const newImages = await uploadImages(product.images ?? []);
  product.images = newImages;

  product = cleanProduct(product);

  if (productId && productId !== '') {
    // Actualizar producto
    return await updateProduct(productId, product);
  }
  return await createProduct(product);
};

const cleanProduct = (product: Partial<Product>) => {
  const images =
    product.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop();
        return imageName ? imageName : '';
      }
      return image;
    }) ?? [];

  delete product.id;
  delete product.user;
  product.images = images;

  return product;
};
const updateProduct = async (productId: string, product: Partial<Product>) => {
  try {
    const { data } = await tesloApi.patch(`/products/${productId}`, product);
    return data;
  } catch (error) {
    console.log('Error updating product', error);
  }
};

const createProduct = async (product: Partial<Product>) => {
  const images =
    product.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop();
        return imageName ? imageName : '';
      }
      return image;
    }) ?? [];

  delete product.id;
  delete product.user;
  product.images = images;

  try {
    const { data } = await tesloApi.post(`/products/`, product);
    return data;
  } catch (error) {
    console.log('Error creating product', error);
  }
};

const uploadImages = async (images: string[] | File[]) => {
  const fileToUpload = images.filter((image) => image instanceof File) as File[];
  const currentImage = images.filter((image) => typeof image === 'string') as string[];

  const uploadPromises = fileToUpload.map(async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await tesloApi.post<{ secureUrl: string }>(`/files/product`, formData);
      return data.secureUrl;
    } catch (error) {
      console.error('Error uploading image', error);
    }
  });

  const uploadedImages = await Promise.all(uploadPromises);

  return [...currentImage, ...uploadedImages];
};
