import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOID_DIR } from '../constants/index.js';
import { env } from './env.js';


export const saveFileToUploadDir = async (file) => {
    await fs.rename(
        path.join(TEMP_UPLOAD_DIR, file.filename),
        path.join(UPLOID_DIR, file.filename),
    );

    return `${process.env.APP_DOMAIN}/uploads/${file.filename}`;
};
