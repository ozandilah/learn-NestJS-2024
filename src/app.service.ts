import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

// dto

@Injectable()
export class AppService {
  // membuat data dumy
  //   dimisalkan dari database
  private users: CreateUserDTO[] = [
    {
      email: 'admin@icodie.com',
      userName: 'Fauzan',
      isActive: true,
    },
    {
      email: 'admin@icodie.com',
      userName: 'Azhar',
      isActive: true,
    },
    {
      email: 'admin@icodie.com',
      userName: 'Rosikin',
      isActive: true,
    },
  ];
  getHello(): string {
    return 'Hello Indonesia!';
  }

  findUserByStatus(userStatus: boolean): CreateUserDTO[] {
    return this.users.filter((user) => user.isActive === userStatus);
  }

  saveNewUser(entity: CreateUserDTO): CreateUserDTO {
    this.users.push(entity);
    return entity;
  }
}
