import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
@Injectable()
export class UtilsService {
    static getConfirmHeader(value) {
        const isTrue = value === 'true';
        return isTrue ? '' : true;
    }

    static serialize(query) {
        const str = Object.keys(query).reduce((value, key) => {
            if (!_.isNil(query[key])) {
                if (_.isArray(query[key])) {
                    query[key].forEach(element =>
                        value.push(`${key}=${encodeURIComponent(element)}`),
                    );
                } else {
                    value.push(`${key}=${encodeURIComponent(query[key])}`);
                }
            }
            return value;
        }, []);
        return str.length > 0 ? str.join('&') : '';
    }

    static replaceElements(data, key, toReplace) {
        if (Array.isArray(data)) {
            return data.map(obj => {
                const newInternalObject = { ...obj };
                if (!_.isNil(newInternalObject[key])) {
                    newInternalObject[key] = toReplace.find(
                        element => element.id === obj[key].id,
                    );
                }
                return newInternalObject;
            });
        }
        const newObject = { ...data };
        if (!_.isNil(newObject[key])) {
            newObject[key] = toReplace.find(
                element => element.id === data[key].id,
            );
        }
        return newObject;
    }

    static replaceElementsByArrays(data, key, toReplace) {
        if (Array.isArray(data)) {
            return data.map(obj => {
                const newInternalObject = { ...obj };
                if (!_.isNil(newInternalObject[key])) {
                    newInternalObject[key] = toReplace.find(
                        element => element.id === obj[key],
                    );
                }
                return newInternalObject[key];
            });
        }
    }

    static addElements(data, key, toReplace, keyToReplace) {
        if (Array.isArray(data)) {
            return data.map(obj => {
                const newInternalObject = { ...obj };
                newInternalObject.keyToReplace = {};
                newInternalObject[keyToReplace] = toReplace.find(
                    element => element.id === obj[key],
                );
                return newInternalObject;
            });
        }
        const newObject = { ...data };
        newObject.keyToReplace = {};
        newObject[keyToReplace] = toReplace.find(
            element => element.id === data[key],
        );
        return newObject;
    }

    static replaceWith(data, key, toReplace) {
        if (Array.isArray(data)) {
            return data.map((obj) => {
                const newInternalObj = { ...obj };
                newInternalObj[key] = toReplace.find(element => element.id == obj[key]);
                return newInternalObj;
            });
        }
        const newObjObject = { ...data };
        newObjObject[key] = toReplace.find(element => element.id == data[key]);
        return newObjObject;
    }

    static generateParametersId(ids, keyName) {
        const parameters = [];
        ids.forEach(element => {
            parameters.push(`${keyName}=${element}`);
        });
        return parameters.join('&');
    }

    static filterSimpleId(data, collectionName, idKey): Array<any> {
        return [...new Set(_.map(data[collectionName], idKey).filter(i => typeof i !== 'undefined'))];
    }

    static filterIdNotObject(data, idKey): Array<any> {
        return [...new Set(_.map(data, idKey).filter(i => typeof i !== 'undefined').filter(i => i !== null))];
    }

    static filterId(data, key, idKey): Array<any> {
        const dataFiltered = data.map(element =>
            element[key] ? element[key][idKey] : undefined,
        );
        return [...new Set(dataFiltered.filter(i => typeof i !== 'undefined'))];
    }

    filterInternalIds(collection, containerKey, idKey): Array<number> {
        const result = new Set<number>();
        const objectReduce = (accumulator, obj) => accumulator.add(_.get(obj, idKey));
        const internalReduce = (accumulator, internal) => _.reduce(internal[containerKey], objectReduce, accumulator);
        _.reduce(collection, internalReduce, result);
        return Array.from(result);
    }

    static areAllFieldsNull(data: any) {
        return Object.values(data).every(o => o === null);
    }

    static translateOrderQuery(query: any, currentDictionary: object, findIn = 'key') {
        if (query.order) {
            const { order } = query;
            const [field, values] = order.split(',');
            let translated;
            if (findIn === 'value') {
                translated = _.keys(currentDictionary).find(key => currentDictionary[key] === field);
                query.order = translated ? [translated, values].join(',') : order;
            } else {
                translated = currentDictionary[field];
            }
            query.order = translated ? [translated, values].join(',') : order;
        }

        return query;
    }

    static find(collection: Array<any>, objectId: number) {
        const element = _.find(collection, ({ id }) => id === objectId);

        return element ? element : null;
    }

    static toArrayIds(...values): Array<number> {
        const ids = [];
        values.forEach(value => {
            if (value) {
                ids.push(value.id);
            }
        });

        return ids;
    }

    static mergeDynamicAttributes(data: { extra_attributes: { [x: string]: any; }; }, dynamicAttributes: any[]): Record<string, any> {
        const { extra_attributes: extraAttributes } = data;
        if (extraAttributes) {
            const slugs = Object.keys(extraAttributes || []);
            const completedExtraAttributes = slugs.map((slug) => {
                const { data_type: dataType, name } = dynamicAttributes.find(dynamicAttribute => dynamicAttribute.slug === slug);
                const value = extraAttributes[slug];

                return {
                    slug,
                    name,
                    value,
                    dataType,
                };
            });
            const result = {};
            completedExtraAttributes.forEach(({slug, name, value, dataType }) => {
                result[slug] = { value, name, dataType }
            });

            return result;
        }

        return null;
    }

    static checkIfInitOnly(object: any) {
        if (object) {

            Object.keys(object).forEach(key => {
                if (object[key] === undefined) {
                    delete object[key];
                }
            });
            const keys = Object.keys(object);
            const length = keys.length;

            return length === 1 && keys.includes('init');
        }

        return false;
    }
}
