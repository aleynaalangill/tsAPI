import {defaultCacheOptions, WarpFactory} from "warp-contracts";
import {faker} from '@faker-js/faker';
import {ContractState} from "hollowdb";
import {ENV_CONFIG} from '../src/configurations/config';
import fetch from 'node-fetch';
import Logger, {LogLevel} from "../src/utils/logger";
import {serverDestroyer, serverLauncher} from "./utils/server";

describe(
    'HollowDB <> ExpressJs Test', () => {

        let fixedKey: string = 'bleyna';
        let server:any;



        interface keyValPair {
            value: string | unknown,
            newValue: string | unknown,
            key: string
        }

        function createNewKeyValPair(): keyValPair {
            return {
                value: faker.string.alphanumeric(),
                newValue: faker.string.alphanumeric(),
                key: faker.string.numeric()
            }
        }

        let contractState: ContractState;

        const url = `http://${ENV_CONFIG.HOSTNAME}:${ENV_CONFIG.PORT}`
        beforeAll(async () => {
            console.log('Starting...');
            // let wallet:JWKInterface;
            const warp = WarpFactory.forMainnet({
                ...defaultCacheOptions,
                inMemory: true,
            })
                // .use(new DeployPlugin());
            // const {contractTxId} = await warp.deployFromSourceTx({
            //     wallet: new ArweaveSigner(ENV_CONFIG.WALLET),
            //     initState: JSON.stringify(contractState),
            //     srcTxId: ENV_CONFIG.CONTRACT_TX_ID,
            //     evaluationManifest: {
            //         evaluationOptions: {
            //             allowBigInt: true,
            //             useKVStorage: true,
            //         },
            //     },
            // });
            server = await serverLauncher();
        });
        // afterAll(async () => {
        //     // await server.closeAllConnections();
        //     await server.close();
        // });
        test('This should put data', async () => {
            const key: string = 'aaaaa';
            const value: unknown = 'llll';

            const response = await fetch(url + '/put', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({key, value}),

            });
            const logger = new Logger(LogLevel.INFO);
            logger.info(response)
            expect(response.status).toBe(200);
            // await sleep(1500);

        });
        test('This should get the data', async () => {
            const key: string = fixedKey;

            const response = await fetch(`${url}/get/${key}`);
            // const response = await fetch(url + '/get' + key);

            expect(response.status).toBe(200);
            // await sleep(1500);

        });
        test('This should update the data', async () => {
            const key: string = fixedKey
            const newValue = "newValue";

            const response = await fetch(url + '/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                // body: JSON.stringify({key, newValue}),
                body: JSON.stringify({key, value: newValue}),

            });

            expect(response.status).toBe(200);
            // await sleep(1500);

        },7000);
        test('This should remove the data', async () => {
            const key: string = 'aaaaa';
            const logger = new Logger(LogLevel.INFO);
            logger.info(`${url}/remove/${key}`)
            const response = await fetch(`${url}/remove/${key}`);

            // const response = await fetch(url + '/remove' + key);

            expect(response.status).toBe(200);
            // await sleep(1500);
        });

        afterAll(async () => {
            await serverDestroyer(server);
        });
    });
