import { Injectable } from '@nestjs/common';
import { LinksFactoryService } from '../../core';
import { CreateUserDTO, UserDTO } from '../dtos';
import { User } from '../entities/user.entity';
import { UsersService } from '../model/users.service';

@Injectable()
export class UsersRestService {
    constructor(
        readonly userService: UsersService,
        readonly linksService: LinksFactoryService,
    ) {}

    async findOne(id: string, permissions: Array<any>): Promise<UserDTO> {
        const user: UserDTO = await this.userService.findOne(id);
        user.createLinks(this.linksService, permissions);

        return user;
    }

    async findAll(query: any, permissions: Array<any>): Promise<User[]> {
        return this.userService.findAll();
    }

    async remove(id: string): Promise<void> {
        await this.userService.remove(id);
    }

    async create(createUserDTO: CreateUserDTO, permissions: Array<any>): Promise<UserDTO> {
        const user: UserDTO = await this.userService.create(createUserDTO);
        user.createLinks(this.linksService, permissions);

        return user;
    }

    /*
    translateResponses(
        raw: Array<any>,
        pagination: any,
        query: any,
        permissions: Array<any>,
        shouldCreateLinks = true,
        metadata?:any
    ): ResourcesDTO<UserDTO> {
        const translated = ResourcesFactory.create<UserDTO>(
            UserDTO,
            raw,
            query,
            pagination,
            permissions,
            this,
            shouldCreateLinks,
            metadata,
        );

        return translated;
    } */
}
