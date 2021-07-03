import { RequiredResourcesCreator } from '../../dtos';

export const RequiredResources = (
    resources: Array<RequiredResourcesCreator>,
    schema,
) => {
    return (target: object) => {
        Reflect.defineMetadata(
            'ADDITIONAL_RESOURCES',
            { resources, schema },
            target,
        );
    };
};
