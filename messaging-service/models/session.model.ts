import mongoose, { Schema, Model, model, Types} from "mongoose";
import log from "../logger/log";
export interface ISession{
    _id: Types.ObjectId;
    user: Types.ObjectId; // check IWorker['_id']
    valid: boolean;
    userAgent: string;
}
const sessionSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'Worker', required: true },
    valid: { type: Boolean, default: true },
    userAgent: { type: String, required: true }
}, {timestamps: true}
);

const Session: Model<ISession> = model<ISession>("Session", sessionSchema);

export default Session;







