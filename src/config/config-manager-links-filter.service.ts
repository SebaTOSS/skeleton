import { Injectable } from '@nestjs/common';
import ConfigService from './config.service';
import { LinkRemoveItem } from './dtos';

@Injectable()
export class ConfigManagerLinksFilterService {
    constructor(private readonly configService: ConfigService) {}

    get() {
        const { removeActionLinks } = this.configService.get('configurations');

        return removeActionLinks;
    }

    add(value: LinkRemoveItem) {
        const { entity, links } = value;
        const { removeActionLinks } = this.configService.get('configurations');

        const index = removeActionLinks.findIndex(item => item.entity === entity);
        if (index >= 0) {
            removeActionLinks[index].links = links;
        } else {
            removeActionLinks.push(value);
        }

        this.configService.set('configurations.removeActionLinks', removeActionLinks);

        return this.configService.get('configurations.removeActionLinks');
    }

    delete(value: any) {
        const { entity } = value;
        const { removeActionLinks } = this.configService.get('configurations');

        const filtered = removeActionLinks.filter(item => item.entity !== entity);

        this.configService.set('configurations.removeActionLinks', filtered);

        return this.configService.get('configurations.removeActionLinks');
    }
}
