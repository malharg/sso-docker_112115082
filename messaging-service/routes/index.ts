import {Router, Request, Response} from "express";
import usersRoutes from "./worker.route";
import staticRoutes from "./static.route";

const router = Router();

router.use('/', staticRoutes);
router.use('/workers', usersRoutes);

export default router;