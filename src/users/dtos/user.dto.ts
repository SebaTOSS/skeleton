import { ApiProperty } from "@nestjs/swagger";
import { ResourceDTO } from "../../core";
import { User } from "../entities/user.entity";

export class UserDTO extends ResourceDTO {
    constructor(user?: User) {
        super();
        if (user) {
            this.id = user.id;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
        }
    }

    @ApiProperty()
    mobile: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    firstLogin: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    birthday: string;

    @ApiProperty()
    language: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    loginToken: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    pictureUrl: string;
}
