import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOID_DIR } from './constants/index.js';

const startSerever = async () => {
    try {
        await initMongoConnection();
        await createDirIfNotExists(TEMP_UPLOAD_DIR);
        await createDirIfNotExists(UPLOID_DIR);
        setupServer();
    } catch (error) {
        console.error('Failed to initialize MongoDB connection:', error);
    }

};

startSerever();
