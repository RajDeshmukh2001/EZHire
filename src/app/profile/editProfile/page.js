'use client';

import styles from './edit.module.css';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useSession } from 'next-auth/react';
import { MdCloudUpload } from 'react-icons/md';
import ProfileMenu from '@/components/ProfileMenu/ProfileMenu';
import { UserContext } from "@/context/UserContext/UserContext";

const EditProfile = () => {
    const { userInfo, employerInfo, fetchData, fetchEmployer } = useContext(UserContext);
    const session = useSession();

    const [resumeFile, setResumeFile] = useState("");
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const [inputs, setInputs] = useState({
        fullname: userInfo?.fullname,
        employerName: employerInfo?.employerName,
        email: userInfo?.email || employerInfo?.email,
        phone: userInfo?.phone || employerInfo?.phone,
        designation: userInfo?.designation,
        location: userInfo?.location || employerInfo?.location,
        skills: userInfo?.skills,
        link: employerInfo?.link,
        about: userInfo?.about || employerInfo?.about,
    });

    const router = useRouter();

    if (session.status === 'unauthenticated') {
        router.push('/login');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^\d{10}$/.test(inputs.phone)) {
            toast.error("Invalid Phone Number");
            return;
        }

        setLoading(true);

        const formData = new FormData();

        for (const key in inputs) {
            formData.append(key, inputs[key]);
        }
        if (files.image) {
            formData.append('image', files.image);
        }
        if (files.resume) {
            formData.append('resume', files.resume);
        }

        try {
            const res = await fetch('/api/auth/updateDetails', {
                method: 'PUT',
                body: formData,
            })

            const alert = await res.text();
            if (res.status === 200) {
                toast.success(alert);
                e.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setLoading(false);
                setResumeFile("");
                fetchData();
                fetchEmployer();
                router.push("/postJobs");
            } else {
                toast.error(alert);
                e.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setLoading(false);
            }
            e.target.reset();
        } catch (error) {
            console.log("Error" + error);
        }
    }

    const handleInputFile = (e) => {
        const name = e.target.name;
        const inputFile = e.target.files[0];

        if (inputFile.size < 1024 * 1024 && inputFile.type.startsWith('application/')) {
            setResumeFile(inputFile);
        }

        setFiles((prev) => ({ ...prev, [name]: inputFile }));
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <ProfileMenu>
                <div className={styles.myProfile}>
                    <h3 className={styles.heading}>Update Profile</h3>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.imageInput}>
                            <label htmlFor="img">Upload Image</label>
                            <input
                                type="file"
                                name="image"
                                id="img"
                                accept="image/*"
                                onChange={handleInputFile}
                            />
                        </div>

                        {userInfo ?
                            <div>
                                <label htmlFor="fullname">Fullname</label>
                                <input
                                    type="text"
                                    id="fullname"
                                    name="fullname"
                                    autoComplete="off"
                                    value={inputs.fullname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            :
                            <div>
                                <label htmlFor="employerName">Company Name</label>
                                <input
                                    type="text"
                                    id="employerName"
                                    name="employerName"
                                    autoComplete="off"
                                    value={inputs.employerName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        }

                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                autoComplete="off"
                                value={inputs.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone">Contact Number</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                autoComplete="off"
                                value={inputs.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="(Ex. Mumbai, Maharashtra)"
                                autoComplete="off"
                                value={inputs.location}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {userInfo ?
                            <>
                                <div>
                                    <label htmlFor="designation">Designation</label>
                                    <input
                                        type="text"
                                        id="designation"
                                        name="designation"
                                        autoComplete="off"
                                        value={inputs.designation}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={styles.addSkills}>
                                    <label htmlFor="skills">Skills</label>
                                    <input
                                        type="text"
                                        id="skills"
                                        name="skills"
                                        placeholder="Seperate by Comma (Ex. Java, Python, etc)"
                                        autoComplete="off"
                                        value={inputs.skills}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </>
                            :
                            <div>
                                <label htmlFor="link">Website link</label>
                                <input
                                    type="text"
                                    id="link"
                                    name="link"
                                    autoComplete="off"
                                    value={inputs.link}
                                    onChange={handleChange}
                                />
                            </div>
                        }

                        <div className={styles.about_text}>
                            <label htmlFor="about">About</label>
                            <textarea
                                name="about"
                                id="about"
                                rows="7"
                                value={inputs.about}
                                onChange={handleChange}
                                required>
                            </textarea>
                        </div>

                        {userInfo &&
                            <div className={styles.resume}>
                                <MdCloudUpload className={styles.icon} />
                                <h2 style={{ color: resumeFile ? "#000" : "#777" }}>{resumeFile?.size < 1024 * 1024 ? resumeFile?.name : "Upload CV"}</h2>
                                <div className={styles.resumeInput}>
                                    <input
                                        type="file"
                                        name="resume"
                                        id="resume"
                                        accept=".pdf"
                                        onChange={handleInputFile}
                                    />
                                    <label htmlFor="resume">Browse File</label>
                                    <p>to upload CV/Resume</p>
                                </div>
                                {resumeFile?.size > 1024 * 1024 && <p className={styles.conditions}>Maximum Size: 1 MB</p>}
                            </div>
                        }

                        <div className={styles.buttons}>
                            <button type="reset" className={styles.btn}>Reset</button>
                            <button
                                type="submit"
                                className={loading ? styles.disabled : styles.btn}
                            >
                                {loading ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </form>
                </div>
            </ProfileMenu>
        </>
    );
}

export default EditProfile;