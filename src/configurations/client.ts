import {Admin} from "hollowdb";
import {JWKInterface, WarpFactory} from "warp-contracts";
import {ENV_CONFIG} from "./config";
import Logger, {LogLevel} from "../utils/logger";
import {defaultCacheOptions} from "warp-contracts";
import {LmdbCache} from 'warp-contracts-lmdb'


const logger = new Logger(LogLevel.INFO);

class Client {
    private static instance: Client;
    wallet: JWKInterface = ENV_CONFIG.WALLET;
    contractTxId: string = ENV_CONFIG.CONTRACT_TX_ID;
    admin: Admin;

    constructor(wallet: JWKInterface, contractTxId: string) {
        this.wallet = wallet;
        this.contractTxId = contractTxId;
        const warp =
            ENV_CONFIG.NODE_ENV === 'test'
                ? WarpFactory.forLocal(1984)
                : WarpFactory.forMainnet()
                    .useContractCache(
                        new LmdbCache({
                            ...defaultCacheOptions,
                            inMemory: true,
                            dbLocation: './cache/warp/contract',
                        }),
                        new LmdbCache({
                            ...defaultCacheOptions,
                            inMemory: true,
                            dbLocation: './cache/warp/src',
                        })
                    ).useKVStorageFactory((contractTxId: string) =>
                        new LmdbCache({
                            ...defaultCacheOptions,
                            inMemory: true,
                            dbLocation: `./cache/warp/kv/lmdb_2/${contractTxId}`
                        }))
        this.admin = new Admin(wallet, contractTxId, warp);
        const isProofRequired = false;
        this.admin.updateProofRequirement('auth', isProofRequired);
    }


    public async setupClient(): Promise<void> {
        logger.info('HollowDB cache: ');
        await this.admin.readState();
        logger.info('Contract is ready..')
    }

    public async destroyClient(): Promise<void> {
        try {
            await this.admin.warp.close();
        } catch (err) {
            logger.error(err);
        }
    }

    public static getInstance(): Client {
        if (!Client.instance) {
            Client.instance = new Client(
                ENV_CONFIG.WALLET,
                ENV_CONFIG.CONTRACT_TX_ID
            );
        }
        return Client.instance;
    }

}

export function client(): Client {
    return Client.getInstance();
}

