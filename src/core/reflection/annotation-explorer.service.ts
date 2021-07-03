import { Injectable, Type } from '@nestjs/common';
import { ModulesContainer } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';

@Injectable()
export class AnnotationExplorerService {
    constructor(private readonly modulesContainer: ModulesContainer) {}

    discover(annotation) {
        const modules = [...this.modulesContainer.values()];

        const factories = this.flatMap(modules, instance =>
            this.filterProvider(instance, annotation),
        );

        return factories;
    }

    flatMap<T>(
        modules: Module[],
        callback: (instance: InstanceWrapper) => Type<any> | undefined,
    ): Type<T>[] {
        return modules
            .map(module => [...module.providers.values()].map(callback))
            .reduce((a, b) => a.concat(b), [])
            .filter(element => !!element) as Type<T>[];
    }

    filterProvider(
        wrapper: InstanceWrapper,
        metadataKey: string,
    ): Type<any> | undefined {
        const { instance } = wrapper;
        if (!instance) {
            return undefined;
        }
        return this.extractMetadata(instance, metadataKey);
    }

    extractMetadata(
        instance: Record<string, any>,
        metadataKey: string,
    ): Type<any> {
        if (!instance.constructor) {
            return;
        }
        const metadata = Reflect.getMetadata(metadataKey, instance.constructor);
        return metadata ? (instance.constructor as Type<any>) : undefined;
    }
}
