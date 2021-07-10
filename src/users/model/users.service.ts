import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO, UserDTO } from '../dtos';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createUserDTO: CreateUserDTO): Promise<UserDTO> {
        const user: User = await this.usersRepository.save(createUserDTO);
        const translated: UserDTO = new UserDTO(user);

        return translated;
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: string): Promise<UserDTO> {
        const user: User = await this.usersRepository.findOne(id);
        const translated: UserDTO = new UserDTO(user);

        return translated;
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
