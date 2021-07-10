import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../../core';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';

@Module({
    imports: [
        CoreModule,
        TypeOrmModule.forFeature([User]),
    ],
    providers:[UsersService],
    exports: [
        TypeOrmModule,
        UsersService,
    ],
})
export class UsersModule {}
