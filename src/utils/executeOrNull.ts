import { Wrap } from "./wrap";

const action = function (callback: (...args) => any, args: any) {
    const [raw] = args;
    if (raw) {
        return callback(...args);
    }

    return null;
  };

export function ExecuteOrNull(target: any, key: any, descriptor: any) {
    return Wrap(action)(target, key, descriptor);
}
