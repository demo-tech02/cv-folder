import React from 'react';
import { BiTargetLock } from "react-icons/bi";
import { FaUserCheck } from "react-icons/fa";

import { GoDatabase } from 'react-icons/go';
import { MdPeopleAlt } from "react-icons/md";

const DatabaseSection: React.FC = () => {
  return (
    <section className="w-full py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16 ">
           <GoDatabase className='h-20 w-20 mx-auto'/>

            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-12">
              Our Talent Database
            </h2>
<div className="shadow-[0_2px_4px_0_rgba(0,0,0,0.05),0_-2px_4px_0_rgba(0,0,0,0.05)] rounded-xl py-7">

            <div className='max-w-2xl mx-auto '>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              By purchasing any of our services, you will automatically be added to our{' '}
              <span className="font-semibold text-gray-900 dark:text-white">exclusive database</span>
              {' '}shared with HR professionals and companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3  gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <MdPeopleAlt className="w-8 h-8 " />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Direct HR Access
              </h3>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4">
                <FaUserCheck className="w-8 h-8 " />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Verified Profiles
              </h3>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4">
                <BiTargetLock className="w-8 h-8 " />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Job Matching
              </h3>
            </div>
          </div>

          <p className="mt-12 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your enhanced profile becomes part of a curated talent pool that recruiters actively search
            through for their hiring needs. This gives you ongoing visibility beyond your initial service
            purchase.
          </p>
        </div>
      </div>
      </div>
       </div>
    </section>
  );
};

export default DatabaseSection;
