import Employer from "@/models/Employer";
import conn from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    
    try {
        await conn();
        const { email } = await req.json();
        const employer = await Employer.findOne({ email });
        return NextResponse.json({ employer });
    } catch (error) {
        return new NextResponse('Database Error', { status: 500 });
    }
}