import mongoose from "mongoose";

const conn = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected');
    } catch (error) {
        console.log(error);
    }
}

export default conn;