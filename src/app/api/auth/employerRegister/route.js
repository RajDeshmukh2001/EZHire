import Employer from "@/models/Employer";
import conn from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { employerName, email, phone, password } = await req.json();

    try {
        await conn();
        const employerExist = await Employer.findOne({ email });
        if (employerExist) {
            return new NextResponse('User already exists', { status: 409 });
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const newEmployer = new Employer({ employerName, email, phone, password: hashPassword });

            await newEmployer.save();
            return new NextResponse("Registration Successfull", { status: 201 });
        }
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}