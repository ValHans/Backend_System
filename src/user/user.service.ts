import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  [x: string]: any;
  findOneByEmailOrUsername(_email: string, _username: string) {
    throw new Error('Method not implemented.');
  }
  create(arg0: { email: string; username: string; password: any; }) {
    throw new Error('Method not implemented.');
  }
  findOneByEmail(_email: string) {
    throw new Error('Method not implemented.');
  }
}
