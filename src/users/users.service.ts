import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, email: 'John@John.com', role: 'INTERN' },
    { id: 2, email: 'Doe@doe.com', role: 'ADMIN' },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(user: { email: string; role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
    this.users.push({ id: this.users.length + 1, ...user });

    return user;
  }

  update(
    id: number,
    userUpdate: { email?: string; role?: 'INTERN' | 'ENGINEER' | 'ADMIN' },
  ) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users[userIndex] = {
      id: id,
      email: userUpdate.email ?? this.users[userIndex].email,
      role: userUpdate.role ?? this.users[userIndex].role,
    };

    return this.users[userIndex];
  }

  delete(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    const user = this.users[userIndex];
    this.users = this.users.filter((user) => user.id !== id);

    return user;
  }
}
