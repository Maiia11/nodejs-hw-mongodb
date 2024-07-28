import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';


const startSerever = async () => {
    try {
        await initMongoConnection();
        setupServer();
    } catch (error) {
        console.error('Failed to initialize MongoDB connection:', error);
    }

};

startSerever()
