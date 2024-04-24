import {Document, FilterQuery} from "mongoose";
import Worker, {IWorker} from "../models/worker.model";
import log from "../logger/log";
import {omit} from "lodash";
import WorkerModel from "../models/worker.model";
export async function createWorker(input: Document<IWorker>){
    try{
        return await Worker.create(input);
    }
    catch (err){
        log.error(`Error creating worker: ${err}`);

    }
}

export async function findUser(query: FilterQuery<IWorker>){
    return await WorkerModel.findOne(query).lean();
}

export async function validatePassword(
    {email, password}: {
        email: IWorker['email'];
        password: string;
    }){

    const user = await Worker.findOne({email});

    if(!user){
        return false;
    }
    const isValid = await  user.comparePassword(password);
    if(!isValid){
        return false;
    }
    return omit(user.toJSON(), "password");
}

