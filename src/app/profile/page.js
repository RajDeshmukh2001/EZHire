"use client";

import Error from "@/alerts/Error/Error";
import styles from "./profile.module.css";
import Success from "@/alerts/Success/Success";
import MyProfile from "@/components/MyProfile/MyProfile";
import { format } from 'date-fns';
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { UserContext } from "@/context/UserContext/UserContext";
import { MdCloudUpload } from 'react-icons/md';
import { useContext, useState } from "react";
import JobsPosted from "./jobsPosted/page";

const Profile = () => {
  const { userInfo, employerInfo } = useContext(UserContext);
  const session = useSession();

  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const [imageFile, setImageFile] = useState();
  const [resumeFile, setResumeFile] = useState();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    fullname: userInfo?.fullname,
    email: userInfo?.email || employerInfo?.email,
    phone: userInfo?.phone || employerInfo?.phone,
    designation: userInfo?.designation,
    location: userInfo?.location || employerInfo?.location,
    about: userInfo?.about || employerInfo?.about,
  });

  if (session.status === 'unauthenticated') {
    redirect('/login');
  }

  const validEmail = session?.data?.user?.email === userInfo?.email ? userInfo?.email : employerInfo?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(inputs.phone)) {
      setErr("Invalid Phone Number");
      return;
    }
    setLoading(true);

    const formData = new FormData();

    for (const key in inputs) {
      formData.append(key, inputs[key]);
    }
    formData.append('image', files.image);
    formData.append('resume', files.resume);
    formData.append('userEmail', validEmail);

    try {
      const res = await fetch('/api/auth/updateDetails', {
        method: 'PUT',
        body: formData,
      })

      const alert = await res.text();
      if (res.status === 200) {
        setSuccess(alert);
        e.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setLoading(false);
        setImageFile(false);
        setResumeFile(false);
      } else {
        setErr(alert);
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
    } else {
      setImageFile(inputFile);
    }

    setFiles((prev) => ({ ...prev, [name]: inputFile }));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setErr(false);
    setSuccess(false);
  };

  return (
    <>
      {success && <Success successMsg={success} onClose={handleClose} />}
      {err && <Error errorMsg={err} onClose={handleClose} />}

        {userInfo ? 
      <MyProfile>
          <div className={styles.myProfile}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.imageInput}>
                <label htmlFor="img" style={{ color: imageFile ? "#000" : "#777" }}>{imageFile ? imageFile.name : "Upload Image"}</label>
                <input
                  type="file"
                  name="image"
                  id="img"
                  accept="image/*"
                  onChange={handleInputFile}
                />
              </div>

              
              <input
                type="text"
                name="fullname"
                placeholder="Fullname"
                autoComplete="off"
                value={inputs.fullname}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="off"
                value={inputs.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Contact Number"
                autoComplete="off"
                value={inputs.phone}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="designation"
                placeholder="Designation"
                autoComplete="off"
                value={inputs.designation}
                onChange={handleChange}
              />

              <input
                type="text"
                name="location"
                placeholder="Location (Ex. Mumbai, Maharashtra)"
                autoComplete="off"
                value={inputs.location}
                onChange={handleChange}
                required
              />

              <textarea name="about" rows="7" placeholder="About Yourself" value={inputs.about} onChange={handleChange} required></textarea>

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
                    required
                  />
                  <label htmlFor="resume">Browse File</label>
                  <p>to upload CV/Resume</p>
                </div>
                {resumeFile?.size > 1024 * 1024 && <p className={styles.conditions}>Maximum Size: 1 MB</p>}
              </div>

              <div className={styles.buttons}>
                <button type="reset" className={styles.btn}>Reset</button>
                <button type="submit" className={styles.btn}>{loading ? "Processing..." : "Save"}</button>
              </div>
            </form>
          </div>
      </MyProfile> :
      <JobsPosted />
      }
    </>
  );
};

export default Profile;
