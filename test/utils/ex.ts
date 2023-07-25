import {ENV_CONFIG} from "../../src/configurations/config";

const url = `http://${ENV_CONFIG.HOSTNAME}:${ENV_CONFIG.PORT}`
console.log(url);