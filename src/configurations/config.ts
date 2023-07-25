import { JWKInterface, LogLevel } from "warp-contracts";
import fs from 'fs';

type Environment = 'development' | 'production' | 'test';
const walletPath = 'src/wallets/wallet.json'


interface CONFIG {
    readonly LOG_LEVEL: LogLevel;
    NODE_ENV: Environment;
    PORT: number,
    HOSTNAME: string,
    readonly API_ROOT: string,
    readonly WALLET: JWKInterface,
    CONTRACT_TX_ID: string
}

export const ENV_CONFIG: CONFIG = {

    LOG_LEVEL: (process.env.LOGLEVEL || 'debug') as LogLevel,
    NODE_ENV: (process.env.NODE_ENV || 'development') as Environment,
    PORT: 3000,
    HOSTNAME: 'localhost',
    API_ROOT: 'src',
    WALLET: JSON.parse(fs.readFileSync(walletPath).toString()),
    CONTRACT_TX_ID: 'SXkpTUWwypyHHQMNLWzmTzOZjv3Ns5z60pX8Ui9t50E'

};