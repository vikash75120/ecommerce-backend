type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
}

export const toPublicUser = (user: User) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  createdAt: user.createdAt,
});