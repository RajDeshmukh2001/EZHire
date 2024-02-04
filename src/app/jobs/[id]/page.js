'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './job.module.css';
import Loading from '@/app/loading';
import { format } from 'date-fns';
import { useContext, useEffect } from 'react';
import { FaSuitcase } from 'react-icons/fa';
import { useJobContext } from '@/context/JobContext/JobContext';
import { SlLocationPin } from 'react-icons/sl';
import { GoShareAndroid } from 'react-icons/go';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
import { BsPersonWorkspace, BsDot, BsBookmark } from 'react-icons/bs';
import { PiSuitcaseSimple, PiGraduationCapLight, PiClock } from 'react-icons/pi';
import RelatedJobs from '@/components/RelatedJobs/RelatedJobs';
import { useSession } from 'next-auth/react';
import { UserContext } from '@/context/UserContext/UserContext';

const Job = ({ params }) => {
  const { getSingleJob, isSingleLoading, singleJob } = useJobContext();
  const session = useSession();
  const { employerInfo } = useContext(UserContext);
  const email = session?.data?.user?.email;

  useEffect(() => {
    getSingleJob(`/api/postJob/${params.id}`);
  }, []);

  return (
    <>
      {isSingleLoading ?
        <Loading />
        :
        <div className={styles.container}>
          <div className={styles.jobHeader}>
            <div className={styles.logoAndTitle}>
              <div className={styles.logo}>
                <FaSuitcase className={styles.suitcase} />
              </div>

              <div className={styles.title}>
                <h3>{singleJob?.job_title}</h3>
                <p>{singleJob?.company_name}</p>
              </div>
            </div>

            <div className={styles.type}>
              <p className={styles.jobType}>{singleJob?.job_type}</p>
              <p className={styles.applicant}>Applicants: 0</p>
            </div>
          </div>

          <div className={styles.jobBody}>
            <div className={styles.flexLeft}>
              <div className={styles.aboutJob}>
                <h4>About Job</h4>
                <p>{singleJob?.job_description}</p>
              </div>

              <div className={styles.aboutCompany}>
                <h4>About Company</h4>

                <div className={styles.links}>
                  {singleJob?.website_link && <Link href={singleJob?.website_link} target='_blank' rel='noopener noreferrer'>Website</Link>}
                  <BsDot />
                  {singleJob?.linkedin_link && <Link href={singleJob?.linkedin_link} target='_blank' rel='noopener noreferrer'>LinkedIn</Link>}
                  <BsDot />
                  {singleJob?.other_links && <Link href={singleJob?.other_links} target='_blank' rel='noopener noreferrer'>Profile</Link>}
                </div>

                <p>{singleJob?.company_description}</p>
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
                    <h3>{singleJob?.job_category}</h3>
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

              <div className={styles.buttons}>
                {
                  (session.status === 'unauthenticated' || (session.status === 'authenticated' && employerInfo?.email === email)) ?
                  <Link href="/login"><button>Login to Apply</button></Link> : 
                  <button>Apply</button>
                }
                <div className={styles.btn}>
                  <button><BsBookmark /> Save</button>
                  <button><GoShareAndroid /> Share</button>
                </div>
              </div>
            </div>
          </div>

          <RelatedJobs category={singleJob?.job_category} jobId={singleJob?._id} />
        </div>
      }
    </>
  )
}

export default Job;