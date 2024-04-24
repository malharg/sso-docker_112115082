import { get } from "lodash";
import { Request,Response, NextFunction } from "express";
import log from "../logger/log";
import { decode } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../services/session.service";

// function parseCookies (request: Request) {
//     const list = {};
//     const cookieHeader = request.headers?.cookie;
//     if (!cookieHeader) return list;

//     cookieHeader.split(`;`).forEach(function(cookie) {
//         let [ name, ...rest] = cookie.split(`=`);
//         name = name?.trim();
//         if (!name) return;
//         const value = rest.join(`=`).trim();
//         if (!value) return;
//         list[name] = decodeURIComponent(value);
//     });

//     return list;
// }
async function requiresUser(req: Request, res: Response, next: NextFunction){

    const accessToken = get(req, "cookies.accessToken"); // Bearer Token
    const refreshToken = get(req, "cookies.refreshToken");
    // log.info(`${accessToken}`);
    
    // const cookies = parseCookies(req);
    if(!accessToken) return res.redirect('login');

    const {decoded, expired} = decode(accessToken);

    if(decoded){
        // @ts-ignore
        req.user = decoded;
        return next();
    }

    if(expired && refreshToken){
        const newAccessToken = await reIssueAccessToken(refreshToken);

        if(newAccessToken){
            res.setHeader("authorization", newAccessToken);
            const {decoded} = decode(newAccessToken);

            //@ts-ignore
            req.user = decoded;
        }

        return next();
    }

    return next();


}

export default requiresUser;






