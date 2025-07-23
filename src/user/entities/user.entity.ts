export class UserEntity {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
}

enum Role {
  ADMIN,
  USER,
}
