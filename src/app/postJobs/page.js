"use client";

import Error from "@/alerts/Error/Error";
import styles from "./postJobs.module.css";
import { useSession } from 'next-auth/react';
import Success from "@/alerts/Success/Success";
import { redirect, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useJobContext } from "@/context/JobContext/JobContext";
import { UserContext } from "@/context/UserContext/UserContext";

const PostJobs = () => {
  const session = useSession();
  const { employerInfo } = useContext(UserContext);
  const { getJobs } = useJobContext();
  const router = useRouter();
  const empId = session?.data?.user?.name ? session?.data?.user?.name : employerInfo?._id;

  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const [inputs, setInputs] = useState({
    job_title: "",
    company_name: "",
    location: "",
    skills: "",
    job_type: "",
    job_category: "",
    salary: "",
    duration: "",
    probation_salary: "",
    stipend: "",
    internship_duration: "",
    perks: "",
    experience: "",
    work_mode: "",
    education: "",
    openings: "",
    start_date: "",
    apply_by: "",
    job_description: "",
    website_link: "",
    linkedin_link: "",
    other_links: "",
    company_description: "",
  });

  const email = session?.data?.user?.email;

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      redirect('/postJobs/signin');
    }

    if (session.status === 'authenticated' && employerInfo?.email !== email) {
      setErr('Login as Employer');
      redirect('/');
    }
  }, [session, employerInfo, email]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/postJob", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_title: inputs.job_title,
          company_name: inputs.company_name,
          location: inputs.location,
          skills: inputs.skills,
          job_type: inputs.job_type,
          job_category: inputs.job_category,
          salary: inputs.salary,
          duration: inputs.duration,
          probation_salary: inputs.probation_salary,
          stipend: inputs.stipend,
          internship_duration: inputs.internship_duration,
          perks: inputs.perks,
          experience: inputs.experience,
          work_mode: inputs.work_mode,
          education: inputs.education,
          openings: inputs.openings,
          start_date: inputs.start_date,
          apply_by: inputs.apply_by,
          job_description: inputs.job_description,
          website_link: inputs.website_link,
          linkedin_link: inputs.linkedin_link,
          other_links: inputs.other_links,
          company_description: inputs.company_description,
          employerId: empId,
        })
      });
      if (res.ok) {
        e.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setSuccess("Job posting successfull");
        e.target.reset();
        router.push('/profile/jobsPosted');
        getJobs();
      } else {
        e.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const jobExist = await res.text();
        setErr(jobExist);
        e.target.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setErr(false);
    setSuccess(false);
  };

  return (
    <>
      {err && <Error errorMsg={err} onClose={handleClose} />}
      {success && <Success successMsg={success} onClose={handleClose} />}

      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.jobInformation}>
            <h2 className={styles.heading}>Job Information</h2>

            <div className={styles.inputFields}>
              <input
                type="text"
                name="job_title"
                placeholder="Job Title"
                autoComplete="off"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="company_name"
                placeholder="Company Name"
                autoComplete="off"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="location"
                placeholder="Location (City, State)"
                autoComplete="off"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="skills"
                placeholder="Skills (Seperate by Comma)"
                autoComplete="off"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="experience"
                placeholder="Experience"
                list="experience"
                required
                onChange={handleChange}
              />
              <datalist id="experience">
                <option value="0-1 year" />
                <option value="2 year" />
                <option value="3 year" />
                <option value="4 year" />
                <option value="5+ year" />
              </datalist>

              <select
                name="job_type"
                defaultValue=""
                required
                onChange={handleChange}
              >
                <option value="" disabled hidden>Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Fresher">Fresher</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>

              <select
                name="job_category"
                defaultValue=""
                required
                onChange={handleChange}
              >
                <option value="" disabled hidden>Job Category</option>
                <option value="Architecture">Architecture</option>
                <option value="Sales & Marketing">Sales and Marketing</option>
                <option value="Finance & Accounting">Finance and Accounting</option>
                <option value="Technology">Technology</option>
                <option value="Media, Arts & Design">Media, Arts and Design</option>
                <option value="Business Management">Business Management</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Supply Chain & Logistics">Supply Chain and Logistics</option>
                <option value="Transportation">Transportation</option>
                <option value="Construction & Extraction">Construction and Extraction</option>
              </select>
            </div>
          </div>

          <div className={styles.jobInformation}>
            <h2 className={styles.heading}>Salary Information</h2>

            <div className={styles.inputFields}>
              <input
                type="text"
                name="salary"
                placeholder="Salary (If Job)"
                autoComplete="off"
                onChange={handleChange}
              />
              <input
                type="number"
                name="duration"
                min="1"
                placeholder="Probation Duration (in Months)"
                onChange={handleChange}
              />
              <input
                type="text"
                name="probation_salary"
                placeholder="Salary (During Probation)"
                autoComplete="off"
                onChange={handleChange}
              />

              <p className={styles.or}>OR</p>

              <input
                type="text"
                name="stipend"
                placeholder="Stipend (If Internship)"
                autoComplete="off"
                onChange={handleChange}
              />
              <input
                type="number"
                name="internship_duration"
                min="1"
                placeholder="Internship Duration (in Months)"
                onChange={handleChange}
              />
              <input
                type="text"
                name="perks"
                placeholder="Perks/Benefits (Seperate by Comma)"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.jobInformation}>
            <h2 className={styles.heading}>Job Description</h2>

            <div className={styles.inputFields}>
              <select
                name="work_mode"
                defaultValue=""
                required
                onChange={handleChange}
              >
                <option value="" disabled hidden>Work Mode</option>
                <option value="In-Office">In-Office</option>
                <option value="Remote">Remote</option>
                <option value="Flexible">Flexible</option>
              </select>

              <input
                type="text"
                name="education"
                placeholder="Education"
                list="education"
                onChange={handleChange}
              />
              <datalist id="education">
                <option value="M.B.A" />
                <option value="B.Tech" />
                <option value="B.E" />
                <option value="M.C.A" />
                <option value="B.Com" />
              </datalist>

              <input
                type="number"
                name="openings"
                placeholder="Number of Openings"
                min="1"
                required
                onChange={handleChange}
              />

              <div className={styles.dateFields}>
                <div className={styles.dates}>
                  <label htmlFor="start">Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    id="start"
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.dates}>
                  <label htmlFor="apply">Apply by</label>
                  <input
                    type="date"
                    name="apply_by"
                    id="apply"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <textarea
                name="job_description"
                cols="30"
                rows="10"
                placeholder="Job Description (Requirements/Responsibilities/Qualifications/...)"
                className={styles.editor}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div className={styles.jobInformation}>
            <h2 className={styles.heading}>Company Description</h2>

            <div className={`${styles.inputFields} ${styles.links}`}>
              <input
                type="text"
                name="website_link"
                placeholder="Website Link"
                autoComplete="off"
                required
                onChange={handleChange}
                className={styles.links}
              />
              <input
                type="text"
                name="linkedin_link"
                placeholder="LinkedIn Link"
                autoComplete="off"
                onChange={handleChange}
                className={styles.links}
              />
              <input
                type="text"
                name="other_links"
                placeholder="Other Links"
                autoComplete="off"
                onChange={handleChange}
                className={styles.links}
              />

              <textarea
                name="company_description"
                cols="30"
                rows="10"
                placeholder="About Company"
                className={styles.editor}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div className={styles.buttons}>
            <button type="reset" className={styles.btn}>
              RESET
            </button>
            <button type="submit" className={styles.btn}>
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostJobs;