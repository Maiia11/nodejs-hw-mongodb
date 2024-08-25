import mongoose from 'mongoose';

console.log('SMTP Host:', process.env.SMTP_HOST);
console.log('SMTP Port:', process.env.SMTP_PORT);
console.log('SMTP User:', process.env.SMTP_USER);
console.log('SMTP Password:', process.env.SMTP_PASSWORD);

export const initMongoConnection = async () => {
    try {
        const user = process.env.MONGODB_USER;
        const pwd = process.env.MONGODB_PASSWORD;
        const url = process.env.MONGODB_URL;
        const db = process.env.MONGODB_DB;
        await mongoose.connect(`mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Mongo connection successfully established!");

    } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;

    }
}
