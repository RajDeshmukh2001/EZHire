import os from 'os';
import path from 'path';
import fs from 'fs/promises';
import conn from '@/utils/db';
import User from '@/models/Users';
import { v4 as uuidv4 } from 'uuid';
import Employer from '@/models/Employer';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const config = {
    api: {
        bodyParser: false
    }
};

// Save files to local disk
export const saveFileToLocal = async (image, resume) => {
    try {
        const files = [];
        if (resume) files.push(resume);
        if (image) files.push(image);

        const multipleBuffersPromise = files.map(async (file) => {
            const data = await file.arrayBuffer();
            const buffer = Buffer.from(data);
            const name = uuidv4();
            const ext = file.type.split('/')[1];

            const tempDir = os.tmpdir();
            const uploadDir = path.join(tempDir, `/${name}.${ext}`);
            await fs.writeFile(uploadDir, buffer);

            return { filepath: uploadDir, filename: name };
        });

        return await Promise.all(multipleBuffersPromise)
    } catch (error) {
        console.log(error.message);
        throw new Error(`${error.message} - Error Saving files to Local Directory`);
    }
}

// Upload files to Cloudinary
export const uploadFilesToCloudinary = async (files) => {
    try {
        const multipleFilesPromise = files.map((file) => (
            cloudinary.uploader.upload(file.filepath, { folder: `recruitment` })
        ))
        const cloudinaryResponses = await Promise.all(multipleFilesPromise);

        // After uploading to Cloudinary, delete the local temporary files
        files.forEach((file) => {
            fs.unlink(file.filepath);
        });
        return cloudinaryResponses;
    } catch (error) {
        console.log(error.message);
        throw new Error(`${error.message} - Error Uploading files to Cloudinary`);
    }
}

const PUT = async (req) => {
    try {
        let formData = await req.formData();
        let body = Object.fromEntries(formData);
        const { fullname, employerName, email, phone, designation, location, skills, link, about, image, resume } = body;
        await conn();
        const user = await User.findOne({ email });
        const employer = await Employer.findOne({ email });

        const updateUserFields = {
            fullname,
            email,
            phone,
            designation,
            location,
            skills,
            about,
        }

        const updateEmployerFields = {
            employerName,
            email,
            phone,
            location,
            link,
            about,
        }

        if (!image && !resume) {
            if (user) {
                const updateUser = await User.updateOne({ email }, { $set: updateUserFields });
                if (updateUser) return new NextResponse('Profile updated successfully', { status: 200 });
            } else if (employer) {
                const updateEmployer = await Employer.updateOne({ email }, { $set: updateEmployerFields });
                if (updateEmployer) return new NextResponse('Profile updated successfully', { status: 200 });
            } else {
                return new NextResponse(`Account with ${email} not found`, { status: 400 });
            }
        } else {
            let imageUrl, resumeUrl, asset_id;
            const uploadLocal = await saveFileToLocal(image, resume);
            const uploadToCloudinary = await uploadFilesToCloudinary(uploadLocal);

            uploadToCloudinary.map((file) => {
                if (file.format === 'pdf') {
                    resumeUrl = file.secure_url;
                    asset_id = file.asset_id;
                }
    
                if (file.format === 'jpg' || file.format === 'jpeg' || file.format === 'png') {
                    imageUrl = file.secure_url;
                }
            })

            if (imageUrl) {
                user ? updateUserFields.image_url = imageUrl : updateEmployerFields.image_url = imageUrl;
            }

            if (resumeUrl) {
                user.resume.forEach((res) => {
                    if (res.set_default === true) {
                        res.set_default = false;
                    }
                });

                const newResume = {
                    asset_id,
                    resume_url: resumeUrl,
                    created_at: new Date(),
                    set_default: true,
                }

                user.resume.push(newResume);
            }

            if (user) {
                const updateUser = image && resume ? await User.updateOne({ email }, { $set: { ...updateUserFields, resume: user.resume } }) : await User.updateOne({ email }, { $set: updateUserFields });
                if (updateUser) return new NextResponse('Profile updated successfully', { status: 200 });
            } else if (employer) {
                const updateEmployer = await Employer.updateOne({ email }, { $set: updateEmployerFields });
                if (updateEmployer) return new NextResponse('Profile updated successfully', { status: 200 });
            } else {
                return new NextResponse(`Account with ${email} not found`, { status: 400 });
            }
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(`${error.message} - Something went wrong. Please try again.`, { status: 500 });
    }
}

export { PUT, config };