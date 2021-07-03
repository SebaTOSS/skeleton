import { Global, Module } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { ResponseService } from './response.service';

@Global()
@Module({
    exports: [PaginationService, ResponseService],
    providers: [PaginationService, ResponseService],
})
export class ServicesModule {}
