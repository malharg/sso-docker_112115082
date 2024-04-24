import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../logger/log";

const validateRequest = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        return next();
    } catch (error) {
        log.error(`Request validation error:, ${error}`);
        return res.status(400).json({
            message: "Validation error",
            errors: error,
        });
    }
};

export default validateRequest;
