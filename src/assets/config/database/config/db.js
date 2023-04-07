import mongoose from "mongoose";

if(!import.meta.env.SECRET_MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
}

const DB = async () => {
    try {
        await mongoose.connect(import.meta.env.SECRET_MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = mongoose.connection;

        return db;
    } catch (error) {
        console.log(error);
    }
};

export default DB;