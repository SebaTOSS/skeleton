import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResourcesDTO, ResourcesFactory } from "../../core";
import { Repository } from "typeorm";
import { CreateRoleDTO, RoleDTO } from "../dtos";
import { Role } from "../entities/role.entity";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>
  ) {}

  async create(createRoleDTO: CreateRoleDTO): Promise<RoleDTO> {
    const role: Role = await this.repository.save(createRoleDTO);

    return new RoleDTO(role);
  }

  async findAll(query: any): Promise<ResourcesDTO<RoleDTO>> {
    const { take, skip, order } = query;
    const options = {
      take,
      skip,
      order,
    };

    const [roles, total] = await this.repository.findAndCount(options);

    return ResourcesFactory.create(RoleDTO, roles, query, total);
  }

  async findOne(id: string): Promise<RoleDTO> {
    const role: Role = await this.repository.findOneOrFail(id, {
      relations: ["permissions"],
    });

    return new RoleDTO(role);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
