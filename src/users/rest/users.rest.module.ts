import { Module } from '@nestjs/common';
import { UserLinksService } from './users-links.service';
import { UsersRequiredResourcesService } from './users-required-resources.service';
import { UsersController } from './users.controller';
import { UsersModule } from '../model/users.module';
import { UsersRestService } from './users.rest.service';

@Module({
    imports: [UsersModule],
    controllers: [UsersController],
    providers: [
        UsersRestService,
        UsersRequiredResourcesService,
        UserLinksService,
    ],
    exports: [
        UsersRestService,
        UsersRequiredResourcesService,
        UserLinksService,
    ],
})
export class UsersRESTModule {}
