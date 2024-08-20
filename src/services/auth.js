import createHttpError from "http-errors";
import { User } from "../db/models/users.js";

import bcrypt from "bcrypt";
import { Session } from "../db/models/session.js";

import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from "../constants/index.js";


export const registerUser = async (payload) => {
    const user = await User.findOne({
        email: payload.email
    });
    if (user) {
        throw createHttpError(409, "Email in use");
    }
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    return await User.create({
        ...payload,
        password: encryptedPassword,
    });
};

export const loginUser = async (payload) => {
    const user = await User.findOne({ email: payload.email });
    if (!user) {
        throw createHttpError(404, "User not found");
    }

    const isEqual = await bcrypt.compare(payload.password, user.password);

    if (!isEqual) {
        throw createHttpError(401, "Unauthorized");
    }

    await Session.deleteOne({ userId: user._id });
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    return await Session.create({
        userId: user._id,
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
    });

};
