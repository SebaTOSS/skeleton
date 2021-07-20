import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResourcesDTO, ResourcesFactory } from "../../core";
import { Repository } from "typeorm";
import { CreateUserDTO, UserDTO } from "../dtos";
import { User } from "../entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const user: User = await this.usersRepository.save(createUserDTO);

    return new UserDTO(user);
  }

  async findAll(query: any): Promise<ResourcesDTO<UserDTO>> {
    const { take, skip, order } = query;
    const options = {
      take,
      skip,
      order,
    };

    const [users, total] = await this.usersRepository.findAndCount(options);

    return ResourcesFactory.create(UserDTO, users, query, total);
  }

  async findOne(id: string): Promise<UserDTO> {
    const user: User = await this.usersRepository.findOneOrFail(id);

    return new UserDTO(user);
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
