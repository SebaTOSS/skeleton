import { Wrap } from './wrap';

const action = async function (callback: (...args) => any, args: any) {
    const [, permissions ] = args;
    const translated = await callback(...args);
    if (translated && permissions) {
        translated.createLinks(this.linksService, permissions);
        translated.cleanUp();
    }

    return translated;
  };

export function CreateLinks(target: any, key: any, descriptor: any) {
    return Wrap(action)(target, key, descriptor);
}
