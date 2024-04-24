import { Schema, Model, model, Types} from "mongoose";
import {compare, genSalt, hash} from "bcrypt";
import config from "config";
import log from "../logger/log";

export interface IWorker{
    _id: Types.ObjectId,
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dob?: Date; // Calculate AGE
    gender?: Gender; // Use enum
    skills?: string[];
    location?: Location;
    address?: string; // Check
    available?: boolean;
    industry?: string[];
    experience?: number;
    languages?: string[];
    education?: string;
    jobsApplied?: number[]; // Check
    jobsShortlisted?: number[]; // Check
    accType?: AccountType; // Use enum
}

interface IWorkerMethods {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}
enum AccountType {
    Basic = "basic",
    Premium = "premium",
}


type WorkerModel = Model<IWorker, {}, IWorkerMethods>;


const workerSchema: Schema<IWorker, WorkerModel> = new Schema<IWorker, WorkerModel>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: Date, // Calculate AGE
    gender: { type: String, enum: Object.values(Gender) }, // Use enum
    skills: [String],
    location: { type: String },
    address: { type: String }, // Check
    available: Boolean,
    industry: [String],
    experience: Number,
    languages: [String],
    education: { type: String },
    jobsApplied: [Number], // Check
    jobsShortlisted: [Number], // Check jobReference array
    accType: { type: String, enum: Object.values(AccountType) }, // Use enum
},
    { timestamps: true }
);


workerSchema.pre("save", async function (next){
    try {
        // Only run this function if password was modified (not on other update functions)
        if (!this.isModified('password')) return next();

        const salt = await genSalt(config.get<number>("saltWorkFactor"));
        this.password = await hash(this.password, salt);
    }
    catch (err){
        log.error(`Error at bcrypt: ${err}`);
    }
    return next();
});

workerSchema.method('comparePassword', async function (candidatePassword: string): Promise<boolean> {
    try {
        return await compare(candidatePassword, this.password);
    } catch (err) {
        return false;
    }
});

const Worker: WorkerModel = model<IWorker, WorkerModel>("Worker", workerSchema);

export default Worker;
