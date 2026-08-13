// src/services/user.service.ts
import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';

const userRepository = AppDataSource.getRepository(User);

export const findUsers = () => {
  return userRepository.find();
};

export const fetchUserById = (id: number) => {
  return userRepository.findOneBy({ id });
};

export const fetchUserByEmail = (email: string) => {
  return userRepository.findOneBy({ email });
};

export const addUser = (data: Partial<User>) => {
  const user = userRepository.create(data);
  return userRepository.save(user);
};

export const updateUserField = async (id: number, data: Partial<User>) => {
  await userRepository.update(id, data);
  return userRepository.findOneBy({ id });
};

export const deleteUserById = async (id: number) => {
  const user = await userRepository.findOneBy({ id });
  if (user) await userRepository.remove(user);
  return user;
};

export const fetchUserWithPass = async(email: string)=>{
  return userRepository.findOne({where:{email}, select: ['id', 'name', 'email', 'phone', 'password_hash']});
}