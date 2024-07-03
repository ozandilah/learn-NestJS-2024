import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller({
  path: 'api',
  version: '1',
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/create')
  createHello(): string {
    return 'User was created';
  }

  //   dynamic parameters
  @Get('/user/:name')
  findUser(@Param('name') personName: string): string {
    return `User Name Was ${personName}`;
  }

  @Delete('/user/:name')
  deleteUser(@Param('name') personName: string): string {
    return `User Name ${personName} Was Deleted `;
  }
  @Put('/user/:name')
  updateUser(@Param('name') personName: string): string {
    return `User Name ${personName} Was Updated`;
  }
  @Get('/users')
  getUsers(@Req() req: Request, @Res() res: Response): Response<any> {
    return res.status(200).json({
      data: {
        users: ['Mochammad Fauzan Fadilah', 'Rosikin', 'Azhar', 'Fahmi Afandi'],
      },
      request: req.url,
    });
  }
  @Get('/users/status')
  getByUserStatus(@Res() res: Response): Response<any> {
    const users = this.appService.findUserByStatus(true);
    return res.status(200).send({
      data: users,
    });
  }

  @Get('/config')
  getConfig(@Req() req: Request, @Res() res: Response): Response<any> {
    return res.status(201).send({
      data: {
        appName: this.configService.get<string>('APPLICATION_NAME'),
        port: Number(this.configService.get<number>('APPLICATION_PORT')),
      },
    });
  }

  @Post('/register')
  registerUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() userData: CreateUserDTO,
  ): Response<any> {
    const result = this.appService.saveNewUser(userData);
    return res.status(200).send({
      data: result,
      message: 'User Berhasil Ditambahkan',
    });
  }
}
