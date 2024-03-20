import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        job_title: { type: String, required: true },
        company_name: { type: String, required: true },
        location: { type: String, required: true },
        skills: { type: String, required: true },
        job_type: { type: String, required: true },
        job_category: { type: String, required: true },
        salary: { type: String },
        duration: { type: Number },
        probation_salary: { type: String },
        stipend: { type: String },
        internship_duration: { type: Number },
        perks: { type: String },
        experience: { type: String },
        work_mode: { type: String, required: true },
        education: { type: String },
        openings: { type: Number },
        start_date: { type: Date },
        apply_by: { type: Date },
        job_description: { type: String, required: true },
        company_logo: { type: String },
        website_link: { type: String, required: true },
        other_links: { type: String },
        company_description: { type: String, required: true },
        job_applications: [{
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            user_name: { type: String },
            user_email: { type: String },
            user_resume: { type: String },
            status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
            applied_on: { type: Date, default: Date.now }
        }],
        employerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employer',
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);
export default Job;