// src/services/user.service.ts
import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';
import { redisClient } from '../utils/redis';

const userRepository = AppDataSource.getRepository(User);
const cacheKey = (key: number) => `user:${key}`;
// const CACHE_TTL_SECONDS = 300;
const CACHE_TTL_SECONDS = 30; //for testing

export const findUsers = async () => {
  return await userRepository.find();
};

export const fetchUserById = async (id: number) => {
  const cached = await redisClient.get(cacheKey(id));
  if (cached) {
    console.log('testing redis data: ', cached);
    return JSON.parse(cached);
  }
  const user = await userRepository.findOneBy({ id });
  if (!user) return null;

  await redisClient.set(cacheKey(id), JSON.stringify(user), 'EX', CACHE_TTL_SECONDS);
  return user;
};

export const fetchUserByEmail = async (email: string) => {
  return await userRepository.findOneBy({ email });
};

export const addUser = async (data: Partial<User>) => {
  const user = await userRepository.create(data);
  return userRepository.save(user);
};

export const updateUserField = async (id: number, data: Partial<User>) => {
  await userRepository.update(id, data);
  await redisClient.del(cacheKey(id));
  return fetchUserById(id);
};

export const deleteUserById = async (id: number) => {
  const user = await userRepository.findOneBy({ id });
  if (user) {
    await userRepository.remove(user);
    await redisClient.del(cacheKey(id));
  }
  return user;
};

export const fetchUserWithPass = async (email: string) => {
  return await userRepository.findOne({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      password_hash: true,
      role: true,
    },
  });
};
