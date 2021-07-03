import { Wrap } from "./wrap";

const action = function (callback: (...args) => any, args: any) {
    const [raw] = args;

    const length = Object.values(raw).length;
    if (length > 1) {
        return callback(...args);
    }

    return raw;
};

export function ExecuteIfCompletedObject(target: any, key: any, descriptor: any) {
    return Wrap(action)(target, key, descriptor);
}
