import {SignOptions, sign, verify} from "jsonwebtoken";
import config from "config";
import log from "../logger/log";
import { error } from "console";
const privateKey = config.get<string>('accessTokenSecret');

export function signToken(object: Object, options?: SignOptions | undefined){
    return sign(object, privateKey, options);
}

export function decode(token: string){
    try{

        const decoded = verify(token, config.get("accessTokenSecret"));
        return {valid: true, expired: false, decoded};
    }
    catch (err){
        log.error(`Error decoding AccessToken: ${err}`);
        return{
            valid: false,
            expired: err === "jwt expired",
            decoded: null
        };
    }
}
