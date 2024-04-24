import {Request, Response, Router} from "express";
import validateRequest from "../middleware/validateRequest";
import {createWorkerSchema, workerSessionSchema} from "../schema/worker.schema";
import {createWorkerHandler} from "../controllers/worker.controller";
import {workerSessionHandler} from '../controllers/session.controller';
import { invalidateWorkerSessionHandler } from "../controllers/session.controller";
import requiresUser from "../middleware/requiresUser";
import { getWorkerSessionHandler } from "../controllers/session.controller";

const router = Router();

router
    .get('/', (req: Request, res: Response) =>{
    res.send('Hello!');
    })
    .post('/', validateRequest(createWorkerSchema), createWorkerHandler);

router
    .get('/sessions/', requiresUser, getWorkerSessionHandler)
    .post('/sessions/', validateRequest(workerSessionSchema), workerSessionHandler)
    .delete('/sessions/', requiresUser, invalidateWorkerSessionHandler);


export default router;