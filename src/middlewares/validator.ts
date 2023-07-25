// // import { Request, Response,NextFunction } from 'express';
// // import Joi, { ObjectSchema } from 'joi';
// // import Logger, { LogLevel } from '../utils/logger';
// // import { IGet,IPut,IUpdate,IRemove } from '../interface/interface';
// //
// // const logger = new Logger(LogLevel.ERROR)
// //
// //   // export function validate(
// //   //     schema: ObjectSchema,
// //   //     args: 'body' | 'query' | 'params' = 'body'
// //   //   ) {
// //   //     return async (request: Request, response: Response, next: NextFunction) => {
// //   //       const result: Joi.ValidationResult = schema.validate(request[args]);
// //   //       if (result.error) {
// //   //         logger.error(result.error);
// //   //       } else {
// //   //         next();
// //   //       }
// //   //     };
// //   //   }
// //
// // // TODO: Calismiyorlar :")
// //
// //   export function validate(
// //     schema: ObjectSchema,
// //     args: 'body' | 'query' | 'params' = 'body'
// //   ) {
// //     return (request: Request, response: Response, next: NextFunction) => {
// //       const { error } = schema.validate(request[args]);
// //
// //       if (error) {
// //         logger.error(`Validation error: ${error.details[0].message}`);
// //         response.status(400).send(error.details[0].message);
// //       } else {
// //         next();
// //       }
// //     };
// //   }
// //   export function getValidator() {
// //     const schema: ObjectSchema = Joi.object<IGet>({
// //       key: Joi.string().required()
// //     });
// //     return validate(schema, 'params');
// //   }
// //
// //   export function putValidator() {
// //     const schema: ObjectSchema = Joi.object<IPut>({
// //       key: Joi.string().required(),
// //       value:[Joi.string().required(),Joi.object().required()]
// //     });
// //     return validate(schema, 'body');
// //   }
// //
// //   export function updateValidator() {
// //     const schema: ObjectSchema = Joi.object<IUpdate>({
// //         key: Joi.string().required(),
// //         value:[Joi.string().required(),Joi.object().required()]
// //     });
// //     return validate(schema, 'body');
// //   }
// //
// //   export function removeValidator() {
// //     const schema: ObjectSchema = Joi.object<IRemove>({
// //         key: Joi.string().required()
// //     });
// //     return validate(schema, 'params');
// //   }
//
//
// // import {Request, Response, NextFunction, response, request} from 'express';
// // import Joi, { ObjectSchema } from 'joi';
// // import Logger, { LogLevel } from '../utils/logger';
// // import { IGet, IPut, IUpdate, IRemove } from '../interface/interface';
// //
// // const logger = new Logger(LogLevel.ERROR);
// //
// // export async function validate(
// //     schema: ObjectSchema,
// //     args: 'body' | 'query' | 'params' = 'body'
// // ) {
// //   const result = await schema.validate(request[args]);
// //
// //   if (result.error) {
// //     logger.error(`Validation error: ${result.error.details[0].message}`);
// //     response.status(400).send(result.error.details[0].message);
// //   } else {
// //     next();
// //   }
// // }
// //
// // export function getValidator() {
// //   const schema: ObjectSchema = Joi.object<IGet>({
// //     key: Joi.string().required()
// //   });
// //   return validate(schema, 'params');
// // }
// //
// // export function putValidator() {
// //   const schema: ObjectSchema = Joi.object<IPut>({
// //     key: Joi.string().required(),
// //     value: [Joi.string().required(), Joi.object().required()]
// //   });
// //   return validate(schema, 'body');
// // }
// //
// // export function updateValidator() {
// //   const schema: ObjectSchema = Joi.object<IUpdate>({
// //     key: Joi.string().required(),
// //     value: [Joi.string().required(), Joi.object().required()]
// //   });
// //   return validate(schema, 'body');
// // }
// //
// // export function removeValidator() {
// //   const schema: ObjectSchema = Joi.object<IRemove>({
// //     key: Joi.string().required()
// //   });
// //   return validate(schema, 'params');
// // }
// //
// // function next() {
// //     throw new Error('Function not implemented.');
// // }
//
//
// //////
//
// import { Request, Response, NextFunction } from 'express';
// import Joi, { ObjectSchema } from 'joi';
// import Logger, { LogLevel } from '../utils/logger';
// import { IGet, IPut, IUpdate, IRemove } from '../interface/interface';
//
// const logger = new Logger(LogLevel.ERROR);
//
// export function validate(
//     schema: ObjectSchema,
//     args: 'body' | 'query' | 'params' = 'body'
// ) {
//   return (request: Request, response: Response, next: NextFunction) => {
//     const result = schema.validate(request[args]);
//
//     if (result.error) {
//       logger.error(`Validation error: ${result.error.details[0].message}`);
//       response.status(400).send(result.error.details[0].message);
//     } else {
//       next();
//     }
//   }
// }
//
// export function getValidator() {
//   const schema: ObjectSchema = Joi.object<IGet>({
//     key: Joi.string().required()
//   });
//   return validate(schema, 'params');
// }
//
// export function putValidator() {
//   const schema: ObjectSchema = Joi.object<IPut>({
//     key: Joi.string().required(),
//     value: Joi.alternatives().try(Joi.string(), Joi.object()).required()
//   });
//   return validate(schema, 'body');
// }
//
// export function updateValidator() {
//   const schema: ObjectSchema = Joi.object<IUpdate>({
//     key: Joi.string().required(),
//     value: Joi.alternatives().try(Joi.string(), Joi.object()).required()
//   });
//   return validate(schema, 'body');
// }
//
// export function removeValidator() {
//   const schema: ObjectSchema = Joi.object<IRemove>({
//     key: Joi.string().required()
//   });
//   return validate(schema, 'params');
// }
import Joi from 'joi';
import type {IGet, IPut, IRemove, IUpdate} from 'interface/interface';
import Logger, {LogLevel} from "../utils/logger";
import {StatusCodes} from "http-status-codes";
import {Request, Response, NextFunction} from 'express';


const logger: Logger = new Logger(LogLevel.ERROR);

export function validate(
    schema: Joi.ObjectSchema,
    property: 'body' | 'query' | 'params' = 'body'
) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const result: Joi.ValidationResult = schema.validate(request[property]);
        if (result.error) {
            logger.error(result.error);
        } else next();
    };
}

export const putValidator = validate(
    Joi.object<IPut>({
        key: Joi.string().required(),
        value: [Joi.string().required(), Joi.object().required()],
    }),
    'body'
);

export const updateValidator = validate(
    Joi.object<IUpdate>({
        key: Joi.string().required(),
        value: [Joi.string().required(), Joi.object().required()],
    }),
    'body'
);

export const removeValidator = validate(
    Joi.object<IRemove>({
        key: Joi.string().required(),
    }),
    'body'
);

export const getValidator = validate(
    Joi.object<IGet>({
        key: Joi.string().required(),
    }),
    'params'
);
