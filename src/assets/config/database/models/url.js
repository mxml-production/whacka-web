import mongoose from "mongoose";

const Url = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    guildId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Url', Url);