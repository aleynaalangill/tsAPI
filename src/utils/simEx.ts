import { Admin } from 'hollowdb';
import { WarpFactory } from 'warp-contracts';
import { ENV_CONFIG } from '../configurations/config';

const warp = WarpFactory.forMainnet();
const admin = new Admin(ENV_CONFIG.WALLET, ENV_CONFIG.CONTRACT_TX_ID,warp);

admin.put('Aleyna','Alangil');
console.log(admin.get('Aleyna'));
