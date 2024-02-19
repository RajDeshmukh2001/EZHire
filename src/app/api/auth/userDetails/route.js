import User from "@/models/Users";
import conn from "@/utils/db";
import { NextResponse } from "next/server";

const POST = async (req) => {
    
    try {
        await conn();
        const { email } = await req.json();
        const user = await User.findOne({ email });
        return NextResponse.json({ user });
    } catch (error) {
        return new NextResponse('Database Error', {status: 500});
    }
}

export { POST };