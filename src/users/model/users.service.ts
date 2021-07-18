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

    const pages = Math.round(total / take);
    const prePage = skip - 1 || 0;
    const nextPage = skip + 1 <= total ? skip + 1 : 0;
    const pagination = {
      total,
      pages,
      prePage,
      nextPage,
      perPage: take,
      page: skip,
    };

    return ResourcesFactory.build(UserDTO, users, query, pagination);
  }

  async findOne(id: string): Promise<UserDTO> {
    const user: User = await this.usersRepository.findOneOrFail(id);

    return new UserDTO(user);
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
