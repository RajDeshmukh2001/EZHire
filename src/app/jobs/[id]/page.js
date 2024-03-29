'use client';

import Link from 'next/link';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { format } from 'date-fns';
import Loading from '@/app/loading';
import styles from './job.module.css';
import { toast } from 'react-toastify';
import { FaSuitcase } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { SlLocationPin } from 'react-icons/sl';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { BsPersonWorkspace, BsDot } from 'react-icons/bs';
import { GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
import ApplyButton from '@/components/ApplyButton/ApplyButton';
import RelatedJobs from '@/components/RelatedJobs/RelatedJobs';
import { UserContext } from '@/context/UserContext/UserContext';
import { useJobContext } from '@/context/JobContext/JobContext';
import { PiSuitcaseSimple, PiGraduationCapLight, PiClock } from 'react-icons/pi';

const Job = ({ params }) => {
  const [hasApplied, setHasApplied] = useState(false);
  const { getSingleJob, isSingleLoading, singleJob } = useJobContext();
  const { userInfo } = useContext(UserContext);
  
  useEffect(() => {
    getSingleJob(`/api/postJob/${params.id}`);
  }, []);
  
  const handleApply = async () => {
    try {
      const getResumeUrl = userInfo?.resume.filter((res) => res.set_default === true);
      const setResumeUrl = getResumeUrl[0].resume_url;

      const res = await fetch(`/api/applyJobs`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobId: params.id,
          userId: userInfo?._id,
          user_name: userInfo?.fullname,
          user_email: userInfo?.email,
          user_resume: setResumeUrl
        })
      });

      const resAlert = await res.text();
      if (res.status === 200) {
        toast.success(resAlert);
        setHasApplied(true);
      } else {
        toast.error(resAlert);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      {isSingleLoading ?
        <Loading />
        :
        <div className={styles.container}>
          <div className={styles.jobHeader}>
            <div className={styles.logoAndTitle}>
              <div className={styles.logo}>
                {singleJob?.company_logo ? 
                  <Image src={singleJob?.company_logo} alt="logo" width={50} height={50} />
                  :
                  <FaSuitcase className={styles.suitcase} />
                }
              </div>

              <div className={styles.title}>
                <h3>{singleJob?.job_title}</h3>
                <p>{singleJob?.company_name}</p>
              </div>
            </div>

            <div className={styles.type}>
              <p className={styles.jobType}>{singleJob?.job_type}</p>
              <p className={styles.applicant}>Applications: {singleJob?.job_applications?.length}</p>
            </div>
          </div>

          <div className={styles.jobBody}>
            <div className={styles.flexLeft}>
              <div className={styles.aboutJob}>
                <h4>About Job</h4>
                <p dangerouslySetInnerHTML={{__html: DOMPurify && DOMPurify.sanitize(singleJob?.job_description || '')}}></p>
              </div>

              <div className={styles.aboutCompany}>
                <h4>About Company</h4>

                <div className={styles.links}>
                  {singleJob?.website_link && <Link href={singleJob?.website_link} target='_blank' rel='noopener noreferrer'>Website</Link>}
                  {singleJob?.other_links &&<BsDot />}
                  {singleJob?.other_links && <Link href={singleJob?.other_links} target='_blank' rel='noopener noreferrer'>Profile</Link>}
                </div>

                <p dangerouslySetInnerHTML={{__html: DOMPurify && DOMPurify.sanitize(singleJob?.company_description || '')}}></p>
              </div>
            </div>

            <div className={styles.flexRight}>
              <div className={styles.jobInfo}>
                <div className={styles.gridColumn}>
                  <SlLocationPin className={styles.icon} />
                  <div className={styles.info}>
                    <p>Location</p>
                    <h3>{singleJob?.location}</h3>
                  </div>
                </div>

                <div className={styles.gridColumn}>
                  <PiSuitcaseSimple className={styles.icon} />
                  <div className={styles.info}>
                    <p>Experience</p>
                    <h3>{singleJob?.experience}</h3>
                  </div>
                </div>

                <div className={styles.gridColumn}>
                  <BsPersonWorkspace className={styles.work} />
                  <div className={styles.info}>
                    <p>Work Mode</p>
                    <h3>{singleJob?.work_mode}</h3>
                  </div>
                </div>

                <div className={styles.gridColumn}>
                  <PiGraduationCapLight className={styles.icon} />
                  <div className={styles.info}>
                    <p>Education</p>
                    <h3>{singleJob?.education}</h3>
                  </div>
                </div>

                <div className={styles.gridColumn}>
                  <PiClock className={styles.icon} />
                  <div className={styles.info}>
                    <p>Start Date</p>
                    <h3>{singleJob?.start_date && format(new Date(singleJob?.start_date), 'dd MMM yyyy')}</h3>
                  </div>
                </div>

                <div className={styles.gridColumn}>
                  <PiClock className={styles.icon} />
                  <div className={styles.info}>
                    <p>Apply By</p>
                    <h3>{singleJob?.apply_by && format(new Date(singleJob?.apply_by), 'dd MMM yyyy')}</h3>
                  </div>
                </div>

                <div className={styles.gridColumn}>
                  <AiOutlineFieldNumber className={styles.icon} />
                  <div className={styles.info}>
                    <p>No of Openings</p>
                    <h3>{singleJob?.openings}</h3>
                  </div>
                </div>

                <div className={styles.gridColumn}>
                  <Image src='/categories.png' alt="categories" width={23} height={23} />
                  <div className={styles.info}>
                    <p>Category</p>
                    <h3>{singleJob?.job_category?.split("_").join(" ")}</h3>
                  </div>
                </div>

                <div className={styles.gridColumn}>
                  <GiMoneyStack className={styles.icon} />
                  <div className={styles.info}>
                    <p>{singleJob?.salary ? 'Salary' : 'Stipend'}</p>
                    <h3>{singleJob?.salary ? singleJob?.salary : singleJob?.stipend}</h3>
                  </div>
                </div>

                <div className={styles.gridColumn}>
                  <MdOutlineCalendarMonth className={styles.icon} />
                  <div className={styles.info}>
                    <p>{singleJob?.duration ? 'Probation Duration' : 'Internship Duration'}</p>
                    <h3>
                      {singleJob?.duration ? singleJob?.duration : singleJob?.internship_duration}
                      {(singleJob?.duration === 1 || singleJob?.internship_duration === 1) ? ' Month' : ' Months'}
                    </h3>
                  </div>
                </div>

                {singleJob?.probation_salary &&
                  (
                    <div className={styles.gridColumn}>
                      <GiTakeMyMoney className={styles.icon} />
                      <div className={styles.info}>
                        <p>Probation Salary</p>
                        <h3>{singleJob?.probation_salary}</h3>
                      </div>
                    </div>
                  )
                }

                {singleJob?.perks &&
                  (
                    <div className={styles.skillsColumn}>
                      <div className={styles.skillTitle}>
                        <Image src='/perks.png' alt="perks" width={23} height={23} />
                        <p>Perks/Benefits -</p>
                      </div>
                      {singleJob?.perks.split(', ').map((perk, index) => (
                        <h3 key={index}>{perk.replace('.', '')}</h3>
                      ))}
                    </div>
                  )
                }

                <div className={styles.skillsColumn}>
                  <div className={styles.skillTitle}>
                    <Image src='/skill.png' alt="Skill" width={23} height={23} />
                    <p>Skills -</p>
                  </div>
                  {singleJob?.skills && singleJob?.skills.split(', ').map((skill, index) => (
                    <h3 key={index}>{skill.replace('.', '')}</h3>
                  ))}
                </div>

              </div>

              <ApplyButton handleApply={handleApply} hasApplied={hasApplied} />
            </div>
          </div>

          <RelatedJobs category={singleJob?.job_category} jobId={singleJob?._id} />
        </div>
      }
    </>
  )
}

export default Job;