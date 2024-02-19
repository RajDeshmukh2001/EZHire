import conn from "@/utils/db"
import User from "@/models/Users";
import { NextResponse } from "next/server";

const PUT = async (req) => {
    try {
        await conn();
        const { email, resume_id } = await req.json();

        const user = await User.findOne({ email });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        user.resume.forEach(resume => {
            if (resume._id.toString() !== resume_id && resume.set_default) {
                resume.set_default = false;
            }
        });

        const resumeToUpdate = user.resume.find(resume => resume._id.toString() === resume_id);

        if (!resumeToUpdate) {
            return new NextResponse("Resume not found", { status: 404 });
        }

        resumeToUpdate.set_default = true;
        await user.save();
        return new NextResponse("Default resume updated successfully", { status: 200 });
    } catch (error) {
        return new NextResponse(`${error.message} - Failed to update resume`, { status: 500 });
    }
}

export { PUT };