import express from 'express';
import { ENV_CONFIG } from './configurations/config'
import router from './routes/route';
import { client } from './configurations/client';


async function main() {
    const app = express();
    app.use(express.json());
    app.use(router);

    await client().setupClient();
    const port = ENV_CONFIG.PORT;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main();



