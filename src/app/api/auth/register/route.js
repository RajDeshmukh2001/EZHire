import Employer from "@/models/Employer";
import User from "@/models/Users";
import conn from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { fullname, employerName, email, phone, password } = await req.json();

    try {
        await conn();
        const userExist = await User.findOne({ email });

        if (userExist) {
            return new NextResponse('User already exists', { status: 409 });
        } else if (fullname) {
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ fullname, email, password: hashPassword });
            await newUser.save();
            return new NextResponse("Registration successfull", { status: 201 });
        } else if (employerName && phone){
            const hashPassword = await bcrypt.hash(password, 10);
            const newEmployer = new Employer({ employerName, email, phone, password: hashPassword });
            await newEmployer.save();
            return new NextResponse("Employer registration successfull", { status: 201 });
        } else {
            return new NextResponse("Invalid registration data", { status: 400 });
        }
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}