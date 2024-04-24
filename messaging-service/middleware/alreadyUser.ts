import { Request,Response, NextFunction } from "express";
import { get } from "lodash";
import {decode} from "../utils/jwt.utils";
import {reIssueAccessToken} from "../services/session.service";
async function alreadyUser(req: Request, res: Response, next: NextFunction){
    
    const accessToken = get(req, "cookies.accessToken"); // Bearer Token
    const refreshToken = get(req, "cookies.refreshToken");
    // log.info(`${accessToken}`);
    
    // const cookies = parseCookies(req);
    if(!accessToken) return next();
    const {decoded, expired} = decode(accessToken);

    if(decoded){
        // @ts-ignore
        req.user = decoded;
        return res.redirect('dashboard');
    }

    if(expired && refreshToken){
        const newAccessToken = await reIssueAccessToken(refreshToken);

        if(newAccessToken){
            res.setHeader("authorization", newAccessToken);
            const {decoded} = decode(newAccessToken);

            //@ts-ignore
            req.user = decoded;
        }

        return res.redirect('dashboard');
    }

    return next();


}
export default alreadyUser;