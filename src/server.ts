import cors from 'cors';
import express from 'express';
import { CONFIG } from './config';

import { errorHandler } from './middleware/errorHandler';
import routers from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler)
app.use(cors(
    {
        origin: "*",
    }
));

app.use('/api/v1', routers)




app.listen(CONFIG.PORT, () => console.log(`🚀 | Running on http://localhost:${CONFIG.PORT}`));

