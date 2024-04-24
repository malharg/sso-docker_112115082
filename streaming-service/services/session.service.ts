import {Types, HydratedDocument} from "mongoose";
import Session, { ISession } from "../models/session.model";
import {IWorker} from "../models/worker.model";
import config from "config";
import {signToken} from "../utils/jwt.utils";
import { decode } from "../utils/jwt.utils";
import { get } from "lodash";
import {findUser} from "../services/worker.service";
import { FilterQuery } from "mongoose";



export async function createSession(usedId: Types.ObjectId, userAgent: string){
    const session = await Session.create({
        user: usedId,
        userAgent
    });
    return session.toJSON();
}

export function createAccessToken({user, session} : {
    user: Omit<IWorker, "password">,
    session: Omit<ISession, "password">
}){
    const accessToken = signToken(
        {user, session: session._id},
        { expiresIn: config.get("accessTokenTTL")}
        );

    return accessToken;
}

export async function reIssueAccessToken(refreshToken: string){

    // Decode refreshToken
    const {decoded} = decode(refreshToken);
    
    if(!decoded || !get(decoded, "_id")) return false;

    // Get the session 
    const session = await Session.findById(get(decoded, "_id"));

    // Make sure the session is still valid

    if(!session || !session?.valid) return false;

    const user = await findUser({_id: session.user});

    if(!user) return false;

    const accessToken = createAccessToken({user, session});

    return accessToken;
}

export async function updateSession(query:FilterQuery<ISession>, update: FilterQuery<ISession>) {
    return Session.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<ISession>){
    return Session.find(query).lean();
}