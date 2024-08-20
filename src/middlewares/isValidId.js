import { isValidObjectId } from "mongoose";
import createHttpError from 'http-errors';

export const isValid = (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        throw createHttpError(400, `Bad Request, id${contactId} not found`);
    }
    next();

};
