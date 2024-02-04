import os from 'os';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import User from '@/models/Users';
import conn from '@/utils/db';
import Employer from '@/models/Employer';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

export const config = {
    api: {
        bodyParser: false
    }
};

export const saveFileToLocal = async (image, resume) => {
    const files = [image];
    if (resume) {
        files.push(resume);
    }

    const multipleBuffersPromise = files.map(async (file) => {
        const data = await file.arrayBuffer();
        const buffer = Buffer.from(data);
        const name = uuidv4();
        const ext = file.type.split('/')[1];

        const tempDir = os.tmpdir();
        const uploadDir = path.join(tempDir, `/${name}.${ext}`);
        await fs.writeFile(uploadDir, buffer);

        return { filepath: uploadDir, filename: file.name };
    });

    return await Promise.all(multipleBuffersPromise)
}

export const uploadFilesToCloudinary = async (files) => {
    const multipleFilesPromise = files.map((file) => (
        cloudinary.uploader.upload(file.filepath, { folder: 'recruitment' })
    ))

    const cloudinaryResponses = await Promise.all(multipleFilesPromise);

    // After uploading to Cloudinary, delete the local temporary files
    files.forEach((file) => {
        fs.unlink(file.filepath);
    });

    return cloudinaryResponses;
}

export const getFiles = async () => {
    try {
        const { resources } = await cloudinary.search
            .expression('folder:recruitment/*')
            .sort_by('created_at', 'desc')
            .max_results(2)
            .execute()
        let resumeSecureUrl;
        let imageSecureUrl;
        let asset_id;
        resources.map(resource => {
            if (resource.format === 'pdf') {
                resumeSecureUrl = resource.secure_url;
                asset_id = resource.asset_id;
            }

            if (resource.format === 'jpg' || resource.format === 'jpeg' || resource.format === 'png') {
                imageSecureUrl = resource.secure_url;
            }
        })

        return { resumeSecureUrl, imageSecureUrl, asset_id };
    } catch (error) {
        console.log(error.message);
    }
}

export const PUT = async (req) => {
    let formData = await req.formData();
    let body = Object.fromEntries(formData);
    const { fullname, email, phone, designation, location, about, image, userEmail, resume } = body

    try {
        const uploadLocal = await saveFileToLocal(image, resume);
        const uploadToCloudinary = await uploadFilesToCloudinary(uploadLocal);
        const resultUrl = await getFiles();
        const imageUrl = resultUrl.imageSecureUrl;
        const resumeUrl = resultUrl.resumeSecureUrl;
        const asset_id = resultUrl.asset_id;

        await conn();
        const user = await User.findOne({ email: userEmail });

        if (user) {
            const updateFields = {
                fullname,
                email,
                phone,
                designation,
                location,
                about,
                image_url: imageUrl,
            };

            const resumeData = {
                asset_id,
                resume_url: resumeUrl,
                created_at: new Date(),
                set_default: false,
            }

            const updateUser = await User.updateOne({ email: userEmail }, { $set: updateFields, $push: { resume: resumeData } });
            if (updateUser) {
                return new NextResponse('Profile updated successfully', { status: 200 })
            }
            console.log(updateUser);
        }

    } catch (error) {
        return new NextResponse(`${error.message} - Something went wrong. Please try again.`, { status: 500 });
    }
}