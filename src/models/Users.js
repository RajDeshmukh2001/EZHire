import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        image_url: { type: String },
        fullname: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        phone: { type: String },
        designation: { type: String },
        location: { type: String },
        about: { type: String },
        resume: [{
            asset_id: { type: String },
            resume_url: { type: String },
            created_at: { type: Date, default: Date.now },
            set_default: { type: Boolean }
        }],
    },
    {
        timestamps: true,
    }
)

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;