import { Request, Response, request } from "express";
import type {
    IPut,
    IGet,
    IRemove,
    IUpdate
} from '../interface/interface'
import { client } from "../configurations/client";
import Logger, { LogLevel } from "../utils/logger";
const logger = new Logger(LogLevel.INFO);

export async function put(request: Request<{}, IPut>, response: Response): Promise<any> {
    console.log('Put request received');

    try {
        const {key, value} = request.body
        logger.info(`Key: ${key}, Value: ${value}`);
        const result = await client().admin.put(key, value);
        response.json({result});
        console.log(response);
    } catch (error) {
        response.status(500).send('An error occurred');
    }
}

export async function update(request: Request<{}, IUpdate>, response: Response): Promise<any> {
    console.log('Update request received');

    try {
        const {key, value} = request.body;
        console.log(`Key: ${key}, Value: ${value}`);
        const result = await client().admin.update(key, value);
        response.json({result});
    } catch (error) {
        response.status(500).send('An error occurred');
    }
   
}

// export async function get(request:Request, response:Response): Promise<any> {
//     console.log('Get request received');
//
//     try{
//         const {key} = request.params.key as unknown as IGet;
//         console.log(`Key: ${key}`);
//         const result = await client().admin.get(key);
//         response.json({result});
//     }catch(err){
//         response.status(500).send('An error occured!');
//     }
// }
export async function get(request: Request<{ key: string }>, response: Response): Promise<any> {
    console.log('Get request received');

    try{
        const key:string = request.params.key;
        console.log(`Key: ${key}`);
        const result = await client().admin.get(key);
        response.json({result});
    }catch(err){
        response.status(500).send('An error occured!');
    }
}


// export async function remove(request: Request, response: Response): Promise<any> {
//     console.log('Remove request received');
//    try{
//     const {key} = request.params.key as unknown as IRemove;
//     console.log(`Key: ${key}`);
//     const result = await client().admin.remove(key);
//     response.json({result});
// }catch (err){
//     response.status(500).send('An error occured!');
// }
// }
export async function remove(request: Request<{ key: string }>, response: Response): Promise<any> {
    console.log('Remove request received');

    try{
        const key:string = request.params.key;
        console.log(`Key: ${key}`);
        const result = await client().admin.remove(key);
        response.json({result});
    } catch (err) {
        response.status(500).send('An error occured!');
    }
}
