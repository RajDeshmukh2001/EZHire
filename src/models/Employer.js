import mongoose from "mongoose";

const employerSchema = new mongoose.Schema(
    {
        image_url: { type: String },
        employerName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        location: { type: String },
        link: { type: String },
        about: { type: String },
        isEmployer: { type: Boolean, default: true },
    }, 
    {
        timestamps: true,
    }
);

const Employer = mongoose.models.Employer || mongoose.model('Employer', employerSchema);
export default Employer;