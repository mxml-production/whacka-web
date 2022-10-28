import mongoose from "mongoose";

const User = new mongoose.Schema({
    discordId: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    }
});

export default mongoose.model('User', User);