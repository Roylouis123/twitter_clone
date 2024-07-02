import Mongoose from "mongoose";

const connectMongoose = async () => {
    try {
        const conn = await Mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectMongoose