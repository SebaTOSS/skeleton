import { LinkCreator } from '../../dtos/link-creator.interface';

export const LinkFactory = (resources: Array<LinkCreator>) => {
    return (target: object) => {
        Reflect.defineMetadata('LINK_FACTORY', resources, target);
    };
};
