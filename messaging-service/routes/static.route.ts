import {Request, Response, Router} from "express";
import requiresUser from "../middleware/requiresUser";
import { workerSessionHandler } from "../controllers/session.controller";
import { workerSessionSchema } from "../schema/worker.schema";
import  validateRequest from '../middleware/validateRequest';
import { createWorkerSchema } from "../schema/worker.schema";
import { createWorkerHandler } from "../controllers/worker.controller";
import alreadyUser from "../middleware/alreadyUser";

const router = Router();


router.get('/', (req: Request, res: Response) =>{
    // if (!req.session.username) {
    //     res.redirect('/login');
    //     return;
    // }
    res.render('home');
});

router
    .get('/login', alreadyUser,(req: Request, res: Response) =>{
        res.render('login');
    })
    .post('/login',validateRequest(workerSessionSchema), workerSessionHandler);

router
    .get('/signup', alreadyUser,(req: Request, res:Response) =>{
        res.render('signup');
    })
    .post('/signup',validateRequest(createWorkerSchema), createWorkerHandler);


router.get('/dashboard',requiresUser, (req: Request, res: Response) =>{
    res.render('dashboard');
});

router.get('/logout', requiresUser,(req: Request, res: Response)=>{
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.redirect('/');

});

export default router;