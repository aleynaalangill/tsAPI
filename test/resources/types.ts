
import type {ContractState} from 'hollowdb'

const initialState: ContractState = {
    owner: '',
    verificationKeys: {
        auth: false
    },
    isProofRequired: {
        auth: false
    },
    canEvolve: false,
    whitelists: {
      put: {},
      update: {},
    },
    isWhitelistRequired: {
      put: false,
      update: false,
    },
  };
  
  export default initialState;
  