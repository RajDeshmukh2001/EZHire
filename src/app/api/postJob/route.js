import conn from "@/utils/db";
import Job from "@/models/Job";
import { NextResponse } from "next/server";


export const config = {
    api: { bodyParser: false },
};

export const GET = async (req) => {
    try {
        await conn();
        const jobs = await Job.find({}).sort({ createdAt: -1 });
        return new NextResponse(JSON.stringify(jobs), { status: 200 });
    } catch (error) {
        return new NextResponse('Error', { status: 500 });
    }
}

export const POST = async (req) => {
    const { job_title, company_name, location, skills, job_type, job_category, salary, duration, probation_salary, stipend, internship_duration, perks, experience, work_mode, education, openings, start_date, apply_by, job_description, website_link, linkedin_link, other_links, company_description, employerId } = await req.json();

    try {
        await conn();
        const jobExist = await Job.findOne({ $and: [{ job_title: { $regex: job_title, $options: "i" } }, { company_name: { $regex: company_name, $options: "i" } }, { job_type: job_type }] });
        
        if (jobExist) {
            return new NextResponse('Job already exists', { status: 409 });
        } else {
            const newjob = new Job({ job_title, company_name, location, skills, job_type, job_category, salary, duration, probation_salary, stipend, internship_duration, perks, experience, work_mode, education, openings, start_date, apply_by, job_description, website_link, linkedin_link, other_links, company_description, employerId });

            await newjob.save();
            return new NextResponse('Job Posted', { status: 201 });
        }
    } catch (error) {
        return new NextResponse(`${error} Failed to post job`, { status: 500 });
    }
}