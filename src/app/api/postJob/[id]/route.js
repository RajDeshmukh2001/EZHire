import Job from "@/models/Job";
import conn from "@/utils/db";
import { NextResponse } from "next/server";

const GET = async (req, { params }) => {
    const { id } = params;

    try {
        await conn();
        const job = await Job.findById(id);
        return new NextResponse(JSON.stringify(job), { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}

const DELETE = async (req, { params }) => {
    const { id } = params;
    
    try {
        await conn();
        await Job.findByIdAndDelete(id);
        return new NextResponse('Job has been deleted', { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export { GET, DELETE };