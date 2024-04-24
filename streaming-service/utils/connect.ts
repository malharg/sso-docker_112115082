import mongoose from "mongoose";
import log from "../logger/log";
import config from "config";

async function connectDB(): Promise<void> {
    const dbURI = config.get<string>("dbURI");
    try {
        await mongoose.connect(dbURI);
        log.info(`Mongoose connected at ${dbURI}`);
    } catch (error) {
        log.error('Database connection error:', error);
        process.exit(1);
    }
}

export default connectDB;
