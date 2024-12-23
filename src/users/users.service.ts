import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, email: 'John@John.com', role: 'INTERN' },
    { id: 2, email: 'Doe@doe.com', role: 'ADMIN' },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const users = this.users.filter((user) => user.role === role);

      if (users.length === 0) {
        throw new NotFoundException(`No user with role ${role} found`);
      }
      return users;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  create(user: CreateUserDto) {
    this.users.push({ id: this.users.length + 1, ...user });

    return user;
  }

  update(id: number, userUpdate: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users[userIndex] = {
      id: id,
      email: userUpdate.email ?? this.users[userIndex].email,
      role: userUpdate.role ?? this.users[userIndex].role,
    };

    return this.users[userIndex];
  }

  delete(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const user = this.users[userIndex];
    this.users = this.users.filter((user) => user.id !== id);

    return user;
  }
}
