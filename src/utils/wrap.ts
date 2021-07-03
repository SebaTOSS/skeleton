/* eslint-disable @typescript-eslint/no-this-alias */
export function Wrap(
    wrapperMethod: {
        (callback: () => any, args: any): any;
        call?: any;
    }
): any {
    return (
        target: { new(arg0: any[]): any; name: any; },
        key: any,
        descriptor: { value: (...arg: any[]) => any; }
    ) => {
        if (typeof(target) === 'function') {
            const newTarget = function (...arg: any[]) {
            const self = this;

            return function() {
                    const methodCallback = function() {
                        return new target(arg);
                    };

                    return wrapperMethod.call(
                        self, methodCallback, arg, target.name, 'class',
                    )
                }()
            };

            return newTarget;
        }

        const orgMethod = descriptor.value;
        descriptor.value = function (...arg: any) {
            const self = this;

            return function() {
                const methodCallback = function() {
                    return orgMethod.apply(self, arg);
                };

                return wrapperMethod.call(
                    self, methodCallback, arg, key, 'function',
                )
            }()
        };

        return descriptor;
    }
}
