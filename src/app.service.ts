import { Injectable } from '@nestjs/common';

// dto

export interface User {
  username: string;
  isActive: boolean;
}
@Injectable()
export class AppService {
  // membuat data dumy
  //   dimisalkan dari database
  private users: User[] = [
    {
      username: 'Fauzan',
      isActive: true,
    },
    {
      username: 'Azhar',
      isActive: true,
    },
    {
      username: 'Rizky',
      isActive: false,
    },
  ];
  getHello(): string {
    return 'Hello Indonesia!';
  }

  findUserByStatus(userStatus: boolean): User[] {
    return this.users.filter((user) => user.isActive === userStatus);
  }
}
