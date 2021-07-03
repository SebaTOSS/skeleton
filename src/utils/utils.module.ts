import { Global, Module } from '@nestjs/common';
import { EncodeStringService } from './encode-string.service';
import { ToService } from './to.service';
import { UtilsService } from './utils.service';

@Global()
@Module({
    providers: [
        UtilsService,
        ToService,
        EncodeStringService,
    ],
    exports: [
        UtilsService,
        ToService,
        EncodeStringService,
    ],
})
export class UtilsModule {}
