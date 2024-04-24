import { Request, Response } from "express";
import log from "../logger/log";
import { validatePassword } from "../services/worker.service";
import { createAccessToken, createSession, updateSession, findSessions } from "../services/session.service";
import { signToken } from "../utils/jwt.utils";
import config from "config";
import { get, find } from "lodash";

export async function workerSessionHandler(req: Request, res: Response) {
    try {
        // Validate User
        const user = await validatePassword(req.body);
        if (!user) {
            return res.status(401).send("Invalid Username or Password");
        }

        // Create Session
        const userAgent = req.get("user-agent") || "";
        const session = await createSession(user._id, userAgent);

        // Create AccessToken
        const accessToken = createAccessToken({ user, session });

        // Create Refresh Token
        const refreshTokenTTL = config.get("refreshTokenTTL") as number;
        const refreshToken = signToken({ session }, { expiresIn: refreshTokenTTL });

        // Send Access & Refresh Tokens
        res.cookie('accessToken', accessToken); // secure: true, use in production over HTTPS
        res.cookie('refreshToken', refreshToken);


        return res.redirect('dashboard');
    } catch (err) {
        log.error(`Failed to handle worker session: ${err}`);
        return res.status(500).send("Internal Server Error");
    }
}

export async function invalidateWorkerSessionHandler(req: Request, res: Response) {
    try {
        const sessionId = get(req, "user.session");
        await updateSession({ _id: sessionId }, { valid: false });
        return res.send(`Removed session:  ${sessionId}`); // No Content
    } catch (err) {
        log.error(`Failed to invalidate session: ${err}`);
        return res.status(500).send("Internal Server Error");
    }
}

export async function getWorkerSessionHandler(req: Request, res: Response) {
    try {
        
        const value = find(req, 'user');
        const id = find(value, '_id');
        const userId = id['_id'];
        const sessions = await findSessions({ user: userId, valid: true });
        return res.send(sessions);
    } catch (err) {
        log.error(`Failed to retrieve sessions: ${err}`);
        return res.status(500).send("Internal Server Error");
    }
}
