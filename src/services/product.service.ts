// src/services/user.service.ts
import { AppDataSource } from '../data-source';
import { Product } from '../entities/product.entity';

const productRepository = AppDataSource.getRepository(Product);

export const findProduct = () => {
  return productRepository.find();
};

export const fetchProductById = (id: number) => {
  return productRepository.findOneBy({ id });
};

export const addProduct = (data: Partial<Product>) => {
  const user = productRepository.create(data);
  return productRepository.save(user);
};

export const updateProductField = async (id: number, data: Partial<Product>) => {
  await productRepository.update(id, data);
  return productRepository.findOneBy({ id });
};

export const deleteProductById = async (id: number) => {
  const user = await productRepository.findOneBy({ id });
  if (user) await productRepository.remove(user);
  return user;
};