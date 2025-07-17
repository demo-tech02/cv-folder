import React from 'react';

interface TestimonialProps {
  name: string;
  position: string;
  company: string;
  testimonial: string;
  imageUrl: string;
  linkedInUrl?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  name,
  position,
  company,
  testimonial,
  imageUrl,
  linkedInUrl,
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
    <div className="flex items-center mb-4">
      <img
        src={imageUrl}
        alt={name}
        className="w-12 h-12 rounded-full mr-4 object-cover"
      />
      <div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {position} at {company}
        </p>
      </div>
      <div className="ml-auto flex space-x-2">
        {linkedInUrl && (
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        )}
      </div>
    </div>
    <blockquote className="text-gray-700 dark:text-gray-300">"{testimonial}"</blockquote>
  </div>
);

const SocialProofSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Al-Mahmoud",
      position: "HR Director",
      company: "ARAMCO",
      testimonial: "The quality of CVs we receive from this platform is exceptional. Clear formatting and ATS-friendly structure makes our screening process much more efficient.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      linkedInUrl: "https://linkedin.com/in/sarah-al-mahmoud"
    },
    {
      name: "Ahmed Hassan",
      position: "Talent Acquisition Manager",
      company: "Tech Corp",
      testimonial: "Finally found a service that understands the Saudi job market! The LinkedIn profiles they optimize consistently perform better in our searches.",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face  ",
      linkedInUrl: "https://linkedin.com/in/ahmed-hassan"
    },
    {
      name: "Fatima Al-Zahra",
      position: "Recruiter",
      company: "STC",
      testimonial: "I've been recommending this platform to all job seekers. The attention to detail and understanding of what employers look for is remarkable.",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      linkedInUrl: "https://linkedin.com/in/fatima-al-zahra"
    },
    
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Trusted by top companies and professionals across Saudi Arabia
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
