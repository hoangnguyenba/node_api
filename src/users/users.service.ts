import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        email: 'admin@foundation.com',
        password: 'supersecret',
      },
      {
        id: 2,
        email: 'hoang@foundation.com',
        password: 'secret',
      }
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.email === username);
  }
}