import conn from "@/utils/db";
import Job from "@/models/Job";
import User from "@/models/Users";
import { NextResponse } from "next/server";

const PUT = async (req, res) => {
    try {
        const { jobId, userId, user_name, user_email, user_resume } = await req.json();
        await conn();
        const job = await Job.findById({ _id: jobId });
        const user = await User.findById({ _id: userId });

        const addUser = {
            userId,
            user_name,
            user_email,
            user_resume,
            applied_on: new Date(),
        }

        if (user_resume) {
            if (job && user) {
                const addJobId = await User.updateOne({ _id: userId }, { $push: { jobs_applied: { jobId, applied_at: new Date() } } });

                const addUserDetails = await Job.updateOne({ _id: jobId }, { $push: { job_applications: addUser } });

                if (addJobId && addUserDetails) {
                    return new NextResponse('Applied successfully', { status: 200 });
                } else {
                    return new NextResponse('Something went wrong', { status: 500 });
                }
            } else {
                return new NextResponse('Job did not exist', { status: 500 });
            }
        } else {
            return new NextResponse('Please upload your resume', { status: 500 });
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export { PUT };

