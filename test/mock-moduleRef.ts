/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContextId, ModuleRef } from "@nestjs/core";
import { Type } from "@nestjs/common";

export class MockModuleRef extends ModuleRef {
    get<TInput = any, TResult = TInput>(typeOrToken: string | symbol | Type<TInput>, options?: { strict: boolean; }): TResult {
        throw new Error("Method not implemented.");
    }
    resolve<TInput = any, TResult = TInput>(typeOrToken: string | symbol | Type<TInput>, contextId?: ContextId, options?: { strict: boolean; }): Promise<TResult> {
        throw new Error("Method not implemented.");
    }
    create<T = any>(type: Type<T>): Promise<T> {
        throw new Error("Method not implemented.");
    }
}
