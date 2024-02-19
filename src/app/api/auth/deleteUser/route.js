import conn from "@/utils/db";
import bcrypt from "bcryptjs";
import Job from "@/models/Job";
import User from "@/models/Users";
import Employer from "@/models/Employer";
import { NextResponse } from "next/server";

const DELETE = async (req) => {
    const { email, password } = await req.json();

    try {
        await conn();
        const user = await User.findOne({ email });
        const employer = await Employer.findOne({ email });
        
        if (user) {
            const verifyUser = await bcrypt.compare(password, user.password);

            if (verifyUser) {
                const deleteUser = await User.findOneAndDelete({ _id: user._id });

                if (deleteUser) {
                    return new NextResponse('Account has been deleted', { status: 201 });
                }
            } else {
                return new NextResponse('Incorrect password', { status: 401 });
            }
        } else if (employer) {
            const verifyEmployer = await bcrypt.compare(password, employer.password);

            if (verifyEmployer) {
                const deleteEmployer = await Employer.findOneAndDelete({ _id: employer._id });
                await Job.deleteMany({ employerId: employer._id });

                if (deleteEmployer) {
                    return new NextResponse('Account has been deleted', { status: 201 });
                }
            } else {
                return new NextResponse('Incorrect password', { status: 401 });
            }
        }
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export { DELETE };