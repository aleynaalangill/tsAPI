import express from "express";
import router from "../../src/routes/route";
import {client} from "../../src/configurations/client";
import {ENV_CONFIG} from '../../src/configurations/config';
import {Server} from "http";
import {resolve} from "../../.pnp.loader.mjs";



export async function serverLauncher(): Promise<Server>{
    const app = express();
    app.use(express.json());
    app.use(router);

    await client().setupClient();

    const port = ENV_CONFIG.PORT;
   return await new Promise(resolve =>{
       const server = app.listen(port, () => {
           console.log(`Server is running on port ${port}`);
           resolve(server);
       });
   })
}

export async function serverDestroyer(server:Server){
    await client().destroyClient();
    server.close();
}
