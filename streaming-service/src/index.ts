import express, {Request, Response} from 'express';
import config from "config";
import log from "../logger/log";
import connectDB from "../utils/connect";
import router from "../routes";
import cors from "cors";
import helmet from "helmet";
import deserializeUser from '../middleware/deserializeUser'
import path from 'path';
import cookieParser from 'cookie-parser';


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'..', 'views'));

const port = config.get<number>("port");
const host = config.get<string>("host");

//Middlewares
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(deserializeUser);


app.use(express.static(path.join(__dirname,'..', 'public')));

// Routes
app.use('/', router);



app.listen(port, async () => {
    try {
        log.info(`Server running at http://${host}:${port}`);
    }
    catch (err){
        log.error('Failed to start server', err);
        process.exit(1);
    }
    await connectDB();
});


