import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (private configService: ConfigService){}
    private prismaService = new PrismaClient();


    hashPassword(password: string): Promise<string> {
        const saltRounds = Number(
          this.configService.get<number>('bcrypt.saltRounds')
        );
        return bcrypt.hash(password, saltRounds);
      }
    
    comparePasswords(
        plainPassword: string,
        hashedPassword: string
        ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
    }
    
    async validateUserRequest(request: { headers: { [x: string]: string } }) {
        const id = request.headers['id'];
        const password = request.headers['password'];
        if (id == undefined || password == undefined) {
            return false;
        }
        const user = await this.prismaService.user.findFirst({
            where: {
                id: Number(id)
            },
        });
        if (user == undefined) {
            return false;
        }
        return await this.comparePasswords(password, user.password);
    }

    
}
