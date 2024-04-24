import log from "../logger/log";
import { Request, Response } from "express";
import { createWorker } from "../services/worker.service";
import { omit } from "lodash";
import { createSession } from "../services/session.service";
import { createAccessToken } from "../services/session.service";
import config from "config";
import { signToken } from "../utils/jwt.utils";
import { validatePassword } from "../services/worker.service";


export async function createWorkerHandler(req: Request, res: Response) {
    try {
        const worker = await createWorker(req.body);
        if (!worker) {
            return res.status(404).send("Worker not found");
        }
        const user = await validatePassword(req.body);
        
        if (!user) {
            return res.status(401).send("Invalid Username or Password");
        }
        const userAgent = req.get("user-agent") || "";
        const session = await createSession(user._id, userAgent);

        // // Create AccessToken
        const accessToken = createAccessToken({ user, session });

        // // Create Refresh Token
        const refreshTokenTTL = config.get("refreshTokenTTL") as number;
        const refreshToken = signToken({ session }, { expiresIn: refreshTokenTTL });

        // // Send Access & Refresh Tokens
        
        
        res.cookie('accessToken', accessToken); // secure: true, use in production over HTTPS
        res.cookie('refreshToken', refreshToken);


        // res.setHeader("Authorization", `Bearer ${accessToken}`);
        // res.setHeader("X-Refresh", refreshToken);
        return res.redirect('dashboard');
    } catch (error) {
        log.error(error);
        return res.status(409).send(error);
    }
}
