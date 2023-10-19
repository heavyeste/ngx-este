import 'reflect-metadata';

import { AutoformItem, AutoformSchema } from '../models/autoformschema.model'
export const SCHEMA_PREFIX = 'schema';

export function AutoformP(attributes?: AutoformSchema) {
  return (target: any, propertyKey: string) => {
    if (attributes === undefined || attributes === null) {
      attributes = new AutoformSchema();
    }
    const myObj: {[index: string]:any} = attributes;
    Object.keys(attributes).forEach(key => {
      if(myObj && myObj[key])
        Reflect.defineMetadata(`${SCHEMA_PREFIX}:${key}`, myObj[key], target, propertyKey);
    });
    var type = Reflect.getMetadata('design:type', target, propertyKey);
    if(!attributes.type)
      attributes.type = type.name.toLowerCase();
    if(!attributes.key)
      attributes.key = propertyKey;
    if(!attributes.label)
      attributes.label = propertyKey;
    Reflect.defineMetadata(`${SCHEMA_PREFIX}`, attributes, target, propertyKey);
  }
}

// export enum AttributeType {
//   Text,
//   Date,
//   Number,
//   Password
// }
// export interface IAttributeProperties {
//   icon?: string;
//   type?: AttributeType;
//   isEditable?: boolean;
//   isVisible?: boolean;
// }
// export const ATTRIBUTE_PREFIX = 'attribute';
// /**
//  * Adds attribute metadata to a property
//  * @param {IAttributeProperties} attributes
//  * @returns {(target: any, propertyKey: string) => void}
//  * @constructor
//  */
// export function Attribute(attributes?: IAttributeProperties) {
//   return (target: object, propertyKey: string) => {
//     if (attributes !== undefined && attributes !== null) {
//       Object.keys(attributes).forEach(key => {
//         Reflect.defineMetadata(`${ATTRIBUTE_PREFIX}:${key}`, attributes[key], target, propertyKey);
//       });
//       Reflect.defineMetadata(`${ATTRIBUTE_PREFIX}`, attributes, target,   propertyKey);
//     }
//   };
// }


